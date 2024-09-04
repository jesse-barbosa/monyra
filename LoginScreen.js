import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = () => {
    if (email && password) {
        axios.post(`${API_URL}`, {
            action: 'login',
            email,
            password
        })
        .then(response => {
            const { success, message, user } = response.data;
            if (success) {
                navigation.navigate('Home', { username: user.nameUser });
            } else {
                Alert.alert('Falha ao entrar :(', message);
            }
        })
        .catch(error => {
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
        });
    } else {
        Alert.alert('Resposta inválida', 'Por favor digite seu e-mail e sua senha.');
    }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              color="gray"
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
          <Icon
              name='key-outline'
              size={24}
              color="gray"
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
                style={styles.eyePassword}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handlePress}>
          <Text style={styles.ButtonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.goRegister}>
          Ainda não tem uma conta?
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}> Crie uma</Text>
        </Text>
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
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    textAlign: 'center',
  },
  inputs: {
    marginTop: 200,
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    fontSize: 16,
  },
  eyePassword: {
    width: 30,
    height: 25,
    resizeMode: 'contain',
    opacity: 0.6,
  },
  Button: {
    backgroundColor: '#5019d4',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goRegister: {
    textAlign: 'center',
    marginTop: 10,
    color: '#808080',
  },
  link: {
    color: '#5019d4',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
