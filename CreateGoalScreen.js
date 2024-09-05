import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './apiConfig';

const TransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategoryValue] = useState('');
  const [amountRemaining, setAmountRemaining] = useState('');
  const [amountSaved, setAmountSaved] = useState('');

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0]
  }
  const handlePress = () => {
      if( name && description && category && amountRemaining && amountSaved){
        axios.post(`${API_URL}`, {
          action: 'createGoal',
          name,
          category,
          description,
          amountSaved,
          amountRemaining,
        })
        .then(response => {
          const { success, message, user } = response.data;
          if (success) {
            navigation.navigate('Home', { username });
          } else {
            Alert.alert('Create Failed', message);
          }
        })
        .catch(error => {
          console.error('Error creating in:', error);
          Alert.alert('Create Error', 'An error occurred while creating goal.');
        });
    } else {
      Alert.alert('Invalid Input', 'Please enter both username and password.');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
            <Text style={styles.title}>Vamos lá {getFirstName(username)}... Seus sonhos estão esperando por você!</Text>
        </View>
        <View style={styles.inputs}>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={30}
              style={styles.input}
              placeholder="Nome da meta"
              onChangeText={setName}
              value={name}
            />
        </View>
        <View style={styles.inputContainer}>
              <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => setCategoryValue(itemValue)}
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
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={50}
              style={styles.input}
              placeholder="Descrição (opcional)"
              onChangeText={setDescription}
              value={description}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={11}
              style={styles.input}
              placeholder="Quanto você quer juntar?"
              onChangeText={setAmountRemaining}
              value={amountRemaining}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={11}
              style={styles.input}
              placeholder="Quanto você já tem?"
              onChangeText={setAmountSaved}
              value={amountSaved}
            />
        </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.Button} onPress={handlePress}>
        <Text style={styles.ButtonTransfer}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: '15%',
    marginBottom: '5%',
    width: '100%',
  },
  header: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
  Button: {
    backgroundColor: '#6630F3',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  ButtonTransfer: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: '#120630',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },
});

export default TransferScreen;