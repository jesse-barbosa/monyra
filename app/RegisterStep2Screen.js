import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../apiConfig';
import styles from '../styles/global';

const RegisterStep2Screen = ({ navigation, route }) => {
  const { username, email, password } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, label: 'Até R$2.000', value: '2000' },
    { id: 2, label: 'R$2.000 - R$4.000', value: '4000' },
    { id: 3, label: 'R$4.000 - R$6.000', value: '6000' },
    { id: 4, label: 'R$6.000+', value: '6000+' },
  ];

  const handleOptionPress = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleRegister = () => {
    if (selectedOption !== null) {
      const selectedIncome = options.find(option => option.id === selectedOption).value;
  
      axios.post(`${API_URL}`, {
        action: 'register',
        username,
        email,
        password,
        incomeUser: selectedIncome
      })
      .then(async response => {
        const { success, message } = response.data;
  
        if (success) {
          // Após o registro, busque os dados do usuário
          const userDataResponse = await axios.post(`${API_URL}`, {
            action: 'getUserData',
            email
          });
  
          const { success: userDataSuccess, user: userData } = userDataResponse.data;
  
          if (userDataSuccess) {
            // Navegue para a Home com os dados do usuário
            navigation.navigate('Home', {
              userData: userData
            });
          } else {
            Alert.alert('Erro ao buscar dados do usuário', 'Não foi possível recuperar os dados do usuário.');
          }
        } else {
          Alert.alert('Falha ao criar :(', message);
        }
      })
      .catch(error => {
        Alert.alert('Registration Error', `An error occurred while registering: ${error}`);
      });
    } else {
      Alert.alert('Seleção Inválida', 'Por favor, selecione uma opção de renda.');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{...styles.container, paddingTop: 40,}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Quase lá...</Text>
          <Text style={styles.subtitle}>Qual sua renda mensal?</Text>
        <View style={styles.options}>
          {options.map((option) => (
            <View style={styles.optionContainer} key={option.id}>
              <TouchableOpacity
                style={[styles.option, { backgroundColor: selectedOption === option.id ? '#292929' : '#F2F2F2' }]}
                onPress={() => handleOptionPress(option.id)}>
                <Text style={[styles.optionText, { color: selectedOption === option.id ? '#fff' : '#000' }]}>{option.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterStep2Screen;
