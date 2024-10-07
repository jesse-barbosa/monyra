import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const ViewTransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { goal, username, email } = route.params;
  const formattedDate = goal.created_at.split(' ')[0];
  const formattedTime = goal.created_at.split(' ')[1];
  
  const deleteGoal = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza de que deseja excluir esta meta?",
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
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: 'deleteGoal',
                goalId: goal.codGoal
              })
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
  
  return (
    <View style={{...styles.container, paddingTop: 40,}}>
      <View style={styles.header}>
      <Text style={styles.title}>{goal.nameGoal}</Text>
        <TouchableOpacity onPress={deleteGoal} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF3838" />
        </TouchableOpacity>
      </View>
      <View style={{...styles.cardViewGoal, paddingHorizontal: 30}}>
        <View style={styles.field}>
          <Text style={styles.label}>Total acumulado:</Text>
          <Text style={styles.value}>R$ {goal.amountSaved}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Total restante:</Text>
          <Text style={styles.value}>R$ {goal.amountRemaining - goal.amountSaved}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{formattedTime}</Text>
        </View>
      <Progress.Bar progress={goal.amountSaved / (goal.amountSaved + goal.amountRemaining)} width={340} height={15} color="#642de8" style={styles.goalBarProgress}/>
      <View style={styles.addCard}>
        <TouchableOpacity onPress={() => navigation.navigate('AddTransfer', { goal, username, email } )} style={styles.addContent}>
        <Icon name='add-circle' size={24} color="#000" style={styles.addIcon}/>
          <Text style={styles.addText}>Adicionar Valor</Text>
        </TouchableOpacity>
      </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewTransferScreen;
