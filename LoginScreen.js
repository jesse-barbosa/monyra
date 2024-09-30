import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = async () => {
    if (email && password) {
      try {
        // Primeiro, faz o login
        const loginResponse = await axios.post(`${API_URL}`, {
          action: 'login',
          email,
          password
        });

        const { success, message, user } = loginResponse.data;

        if (success) {
          // Após o login, busca os dados do usuário
          const userDataResponse = await axios.post(`${API_URL}`, {
            action: 'getUserData',
            email
          });

          const { success: userDataSuccess, user: userData } = userDataResponse.data;

          if (userDataSuccess) {
            // Se a busca de dados for bem-sucedida, navega para a Home com os dados do usuário
            navigation.navigate('Home', {
              userData: userData
            });
          } else {
            Alert.alert('Erro ao buscar dados do usuário', 'Não foi possível recuperar os dados do usuário.');
          }
        } else {
          Alert.alert('Falha ao entrar :(', message);
        }
      } catch (error) {
        // Verifica se o erro tem uma resposta e é um erro do servidor (status 500 ou similar)
        if (error.response && error.response.status >= 500) {
          Alert.alert('Erro no servidor', 'Por favor, tente novamente mais tarde.');
        } else if (error.response && error.response.data) {
          // Mostra a mensagem de erro retornada pelo backend
          Alert.alert('Erro de Login', error.response.data.message);
        } else {
          // Outro erro, como falta de conexão
          Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
        }
      }
    } else {
      Alert.alert('Entrada inválida', 'Por favor digite seu e-mail e sua senha.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Bem vindo de volta</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Icon
              name='mail-outline'
              size={24}
              color='gray'
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name='key-outline'
              size={24}
              color='gray'
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder='Senha'
              autoCapitalize='none'
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color='gray'
                style={styles.eyePassword}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.goRegister}>
          Não tem uma conta?
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}> Crie uma</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;