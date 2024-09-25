import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{goal.nameGoal}</Text>
        <TouchableOpacity onPress={deleteGoal} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF3838" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={20} color="#000" />
          <Text style={styles.label}>Total acumulado:</Text>
          <Text style={styles.value}>R$ {goal.amountSaved}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={20} color="#000" />
          <Text style={styles.label}>Total restante:</Text>
          <Text style={styles.value}>R$ {goal.amountRemaining - goal.amountSaved}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#000" />
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#000" />
          <Text style={styles.label}>Horário:</Text>
          <Text style={styles.value}>{formattedTime}</Text>
        </View>
      <Progress.Bar progress={goal.amountSaved / (goal.amountSaved + goal.amountRemaining)} width={340} height={15} color="#642de8" style={styles.goalBarProgress}/>
      <View style={styles.addTransferCard}>
              <TouchableOpacity onPress={() => navigation.navigate('AddTransfer', { goal, username, email } )} style={styles.addTransferContent}>
              <Icon name='add-circle' size={24} color="#000" style={styles.addTransferIcon}/>
                <Text style={styles.addTransferText}>Adicionar Valor</Text>
              </TouchableOpacity>
            </View>
      </View>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    flex: 1,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginVertical: 'auto',
    justifyContent: 'space-evenly',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoRowDescription: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#666666',
    marginLeft: 10,
    flex: 1,
  },
  value: {
    fontSize: 18,
    color: '#545454',
    fontWeight: 'bold',
    marginLeft: 10,
    flexShrink: 1,
  },
  valueDescription: {
    fontSize: 18,
    color: '#545454',
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'right',
    flex: 1,
    marginTop: 5,
  },
  goalBarProgress: {
    marginTop: 'auto',
    height: 15,
    borderWidth: 0,
    backgroundColor: '#C7C7C7',
  },
  goalRemaining: {
    marginLeft: 'auto',
    fontSize: 16,
    color: 'gray',
  },
  addTransferCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 10,
    marginVertical: 15,
  },
  addTransferContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTransferText: {
    fontSize: 18,
    marginBottom: 5,
    opacity: 0.7,
    color: '#000',
  },
  addTransferIcon: {
    marginRight: 10,
    opacity: 0.7,
    marginBottom: 'auto',
  },
  saveButton: {
    // backgroundColor: '#6630F3',
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginTop: 30,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomColor: '#000',
    borderRightColor: '#000',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ViewTransferScreen;
