import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePress = () => {
    if (username && password) {
      axios.post(`${API_URL}`, {
        action: 'login',
        username,
        password
      })
      .then(response => {
        const { success, message, user } = response.data;
        if (success) {
          navigation.navigate('Home', { username: user.nameUser });
        } else {
          Alert.alert('Login Failed', message);
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        Alert.alert('Login Error', 'An error occurred while logging in.');
      });
    } else {
      Alert.alert('Invalid Input', 'Please enter both username and password.');
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
            <Image source={require('./assets/img/icons/form-icons/profile.png')} style={styles.image} />
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              autoCapitalize="none"
              onChangeText={setUsername}
              value={username}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('./assets/img/icons/form-icons/key-square.png')} style={styles.image} />
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
