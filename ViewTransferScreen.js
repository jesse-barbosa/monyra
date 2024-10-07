import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import styles from './styles';

const ViewTransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { transaction } = route.params;

  const formattedDate = transaction.created_at.split(' ')[0];
  const formattedTime = transaction.created_at.split(' ')[1];

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
  return (
    <View style={{...styles.container, paddingTop: 40,}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={transaction.typeTransaction === 'expense' ? styles.titleExpenseTransfer : styles.titleGainTransfer}>
          {transaction.typeTransaction === 'expense' ? '- ' : '+ '} 
          R$ {transaction.valueTransaction}
        </Text>
        <TouchableOpacity onPress={deleteTransaction} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF3838" />
        </TouchableOpacity>
      </View>

      <View style={{...styles.card, paddingHorizontal: 30, marginVertical: 'auto',}}>
        <View style={styles.field}>
          <Text style={styles.label}>Valor:</Text>
          <Text style={styles.value}>R$ {transaction.valueTransaction}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{transaction.typeTransaction === 'expense' ? 'Gasto' : 'Ganho'}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{formattedTime}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoria:</Text>
          <Text style={styles.value}>{transaction.categoryTransaction}</Text>
        </View>

        <View style={styles.fieldDescription}>
        <Text style={styles.label}>Descrição:</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.valueDescription}>
              {transaction.descTransaction.length > 0 ? transaction.descTransaction : 'Sem descrição'}
            </Text>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewTransferScreen;
