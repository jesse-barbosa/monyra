import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';

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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Quase lá...</Text>
          <Text style={styles.subtitle}>Qual sua renda mensal?</Text>
        </View>
        <View style={styles.options}>
          {options.map((option) => (
            <View style={styles.optionContainer} key={option.id}>
              <TouchableOpacity
                style={[styles.option, { backgroundColor: selectedOption === option.id ? 'gray' : '#F2F2F2' }]}
                onPress={() => handleOptionPress(option.id)}>
                <Text style={[styles.optionText, { color: selectedOption === option.id ? '#fff' : '#000' }]}>{option.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.Button} onPress={handleRegister}>
          <Text style={styles.ButtonLogin}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    margin: 20,
  },
  title: {
    marginTop: 60,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 60,
    color: '#000',
    opacity: 0.4,
    fontWeight: 'bold',
    fontSize: 23,
    lineHeight: 32,
    textAlign: 'center',
  },
  options: {
    marginTop: 100,
    width: '100%',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.4,
  },
  Button: {
    backgroundColor: '#000',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  ButtonLogin: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default RegisterStep2Screen;
