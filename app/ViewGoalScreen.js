import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../apiConfig';
import * as Progress from 'react-native-progress';
import styles from '../styles/global';

const ViewGoalScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData, goal } = route.params;
  const formattedDate = goal.created_at.split(' ')[0];
  const formattedTime = goal.created_at.split(' ')[1];

  // Estados para armazenar mudanças
  const [amountSaved, setAmountSaved] = useState(goal.amountSaved);
  const [categoryGoal, setCategoryGoal] = useState(goal.categoryGoal || "");
  const [descGoal, setDescGoal] = useState(goal.descGoal);
  const [nameGoal, setNameGoal] = useState(goal.nameGoal); // Adicionado para o nome da meta
  const [isModified, setIsModified] = useState(false);

  // Função para deletar a meta
  const deleteGoal = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza de que deseja excluir esta meta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => {
            fetch(`${API_URL}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'deleteGoal', goalId: goal.codGoal })
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                Alert.alert("Sucesso", "Meta excluída com sucesso!");
                navigation.goBack();
              } else {
                Alert.alert("Erro", "Não foi possível excluir a meta.");
              }
            })
            .catch(error => {
              Alert.alert("Erro", "Ocorreu um erro ao excluir a meta.");
              console.error(error);
            });
          }
        }
      ]
    );
  };

  // Função para detectar mudanças
  const handleChangeAmountSaved = (newAmount) => {
    setAmountSaved(newAmount);
    setIsModified(true); // Habilita o botão de salvar
  };

  const handleChangeDescGoal = (newDesc) => {
    setDescGoal(newDesc);
    setIsModified(true);
  };

  const handleChangeCategoryGoal = (newCategory) => {
    setCategoryGoal(newCategory);
    setIsModified(true);
  };

  const handleChangeNameGoal = (newName) => {
    setNameGoal(newName);
    setIsModified(true);
  };

  const saveGoal = () => {
    fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'updateGoal',
        goalId: goal.codGoal,
        nameGoal: nameGoal,
        amountSaved: amountSaved,
        categoryGoal: categoryGoal,
        descGoal: descGoal
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Alert.alert("Sucesso", "Meta atualizada com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível atualizar a meta.");
      }
    })
    .catch(error => {
      Alert.alert("Erro", "Ocorreu um erro ao atualizar a meta.");
      console.error(error);
    });
  };

  return (
    <View style={{ ...styles.container, paddingTop: 40 }}>
      <View style={styles.header}>
        <TextInput
          style={styles.title} // Estilo pode ser alterado conforme necessário
          value={nameGoal}
          onChangeText={handleChangeNameGoal}
          placeholder="Nome da Meta" // Placeholder para o campo de nome
        />
        <TouchableOpacity onPress={deleteGoal} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF3838" />
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.cardViewGoal, paddingHorizontal: 30 }}>
        <View style={styles.field}>
          <Text style={styles.label}>Total acumulado:</Text>
          <TextInput
            style={styles.value}
            keyboardType="numeric"
            value={amountSaved.toString()}
            onChangeText={handleChangeAmountSaved}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Total restante:</Text>
          <Text style={styles.value}>R$ {goal.amountRemaining - amountSaved}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoria:</Text>
          <Picker
            selectedValue={categoryGoal}
            style={styles.picker2}
            onValueChange={handleChangeCategoryGoal}
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
        </View>

        <View style={styles.fieldDescription}>
          <Text style={styles.label}>Descrição:</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <TextInput
              style={styles.valueDescription}
              value={descGoal}
              onChangeText={handleChangeDescGoal}
              multiline={false}
              placeholder="Digite a descrição"
            />
          </ScrollView>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{formattedTime}</Text>
        </View>

        <Progress.Bar 
          progress={amountSaved / (amountSaved + goal.amountRemaining)}
          width={345} 
          height={20} 
          color="#642de8" 
          style={{ ...styles.goalBarProgress, marginTop: 20 }} 
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { opacity: isModified ? 1 : 0.5 }]}
        onPress={saveGoal}
        disabled={!isModified}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewGoalScreen;
