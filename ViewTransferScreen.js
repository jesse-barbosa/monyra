import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './apiConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

const ViewTransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { transaction } = route.params;

  // Estado para armazenar os dados da transferência
  const [valueTransaction, setValueTransaction] = useState(transaction.valueTransaction.toString());
  const [categoryTransaction, setCategoryTransaction] = useState(transaction.categoryTransaction || ""); // Use valor da transação
  const [descTransaction, setDescTransaction] = useState(transaction.descTransaction);
  const [date, setDate] = useState(new Date(transaction.created_at));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [operation, setOperation] = useState(transaction.typeTransaction || 'expense');
  const [isEdited, setIsEdited] = useState(false); // Estado para rastrear alterações

  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDateForBackend = date.toISOString().replace('T', ' ').split('.')[0];

  useEffect(() => {
    // Reseta a categoria ao mudar o tipo de operação
    if (operation === 'expense') {
      setCategoryTransaction(transaction.categoryTransaction || ""); // Define a categoria inicial
    } else {
      setCategoryTransaction(transaction.categoryTransaction || ""); // Define a categoria inicial
    }
  }, [operation]);

  useEffect(() => {
    // Verifica se os dados foram alterados
    if (valueTransaction !== transaction.valueTransaction.toString() || 
        categoryTransaction !== transaction.categoryTransaction || 
        descTransaction !== transaction.descTransaction || 
        date.toISOString().split('T')[0] !== transaction.created_at.split(' ')[0] ||
        operation !== transaction.typeTransaction) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [valueTransaction, categoryTransaction, descTransaction, date, operation]);

  const deleteTransaction = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza de que deseja excluir esta transferência?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            fetch(`${API_URL}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                action: 'deleteTransaction',
                transactionId: transaction.codTransaction,
              }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  Alert.alert("Sucesso", "Transferência excluída com sucesso!");
                  navigation.goBack();
                } else {
                  Alert.alert("Erro", "Não foi possível excluir a transferência.");
                }
              })
              .catch(error => {
                Alert.alert("Erro", "Ocorreu um erro ao excluir a transferência.");
                console.error(error);
              });
          }
        }
      ]
    );
  };

  const handleSave = () => {
    fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'updateTransaction',
            transactionId: transaction.codTransaction,
            valueTransaction: parseFloat(valueTransaction), // Certifica-se que o valor é um número
            categoryTransaction,
            descTransaction,
            created_at: formattedDateForBackend,
            typeTransaction: operation,
        }),
    })
    .then(response => {
        console.log('Response status:', response.status); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            Alert.alert("Sucesso", "Transferência atualizada com sucesso!");
            navigation.goBack();
        } else {
            Alert.alert("Erro", "Não foi possível atualizar a transferência.");
        }
    })
    .catch(error => {
        Alert.alert("Erro", "Ocorreu um erro ao atualizar a transferência.");
        console.error(error);
    });
    
    console.log('Request body:', {
        action: 'updateTransaction',
        transactionId: transaction.codTransaction,
        valueTransaction: parseFloat(valueTransaction),
        categoryTransaction,
        descTransaction,
        created_at: formattedDateForBackend,
        typeTransaction: operation,
    });
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowTimePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={{ ...styles.container, paddingTop: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={operation === 'expense' ? styles.titleExpenseTransfer : styles.titleGainTransfer}>
          {operation === 'expense' ? '- ' : '+ '} 
          R$ {valueTransaction}
        </Text>
        <TouchableOpacity onPress={deleteTransaction} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF3838" />
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.card, paddingHorizontal: 30, marginVertical: 'auto' }}>
        <View style={styles.field}>
          <Text style={styles.label}>Valor:</Text>
          <TextInput
            style={styles.value}
            keyboardType="numeric"
            value={valueTransaction}
            onChangeText={text => {
              setValueTransaction(text);
              setIsEdited(true); // Marca como editado
            }}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Tipo:</Text>
          <Picker
            selectedValue={operation}
            style={styles.picker2}
            onValueChange={(itemValue) => {
              setOperation(itemValue);
              setIsEdited(true); // Marca como editado
            }}
          >
            <Picker.Item label="Gasto" value="expense" />
            <Picker.Item label="Ganho" value="gain" />
          </Picker>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data:</Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.value}>{formattedDate}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Horário:</Text>
          <TouchableOpacity onPress={showTimepicker}>
            <Text style={styles.value}>{formattedTime}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoria:</Text>

          {operation === 'expense' ? (
            <Picker
              selectedValue={categoryTransaction}
              style={styles.picker2}
              onValueChange={(itemValue) => {
                setCategoryTransaction(itemValue);
                setIsEdited(true);
              }}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              <Picker.Item label="Moradia" value="Moradia" />
              <Picker.Item label="Alimentação" value="Alimentação" />
              <Picker.Item label="Transporte" value="Transporte" />
              <Picker.Item label="Saúde" value="Saúde" />
              <Picker.Item label="Educação" value="Educação" />
              <Picker.Item label="Lazer" value="Lazer" />
              <Picker.Item label="Vestuário" value="Vestuário" />
              <Picker.Item label="Economia ou Investimentos" value="Economia" />
            </Picker>
          ) : (
            <Picker
              selectedValue={categoryTransaction}
              style={styles.picker2}
              onValueChange={(itemValue) => {
                setCategoryTransaction(itemValue);
                setIsEdited(true);
              }}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              <Picker.Item label="Salário ou Remunerações" value="Remunerações" />
              <Picker.Item label="Investimentos (rendimentos)" value="Rendimentos" />
              <Picker.Item label="Empreendimentos" value="Empreendimentos" />
              <Picker.Item label="Benefícios" value="Benefícios" />
            </Picker>
          )}
        </View>
        <View style={styles.fieldDescription}>
          <Text style={styles.label}>Descrição:</Text>
          <ScrollView horizontal style={styles.scrollView}>
            <TextInput
              style={styles.valueDescription}
              value={descTransaction}
              onChangeText={text => {
                setDescTransaction(text);
                setIsEdited(true);
              }}
              multiline={true}
              placeholder="Digite a descrição"
            />
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, { opacity: isEdited ? 1 : 0.5 }]} 
        onPress={handleSave} 
        disabled={!isEdited} // Desabilita o botão quando não há edições
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewTransferScreen;
