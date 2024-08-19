import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = () => {
    if (username && email && password) {
        navigation.navigate('RegisterStep2', {
          username,
          email,
          password,
        });
    } else {
      Alert.alert('Campos vazios!', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Crie uma conta</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
          <Icon
              name='person-outline'
              size={24}
              color="gray"
              style={styles.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              autoCapitalize="none"
              onChangeText={setUsername}
              value={username}
            />
          </View>
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
        <TouchableOpacity style={styles.Button} onPress={handleRegister}>
          <Text style={styles.ButtonText}>Criar</Text>
        </TouchableOpacity>
        <Text style={styles.goLogin}>
          Já tem uma conta?
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Entrar</Text>
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goLogin: {
    textAlign: 'center',
    marginTop: 10,
    color: '#808080',
  },
  link: {
    color: '#5019d4',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
