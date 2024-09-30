import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
        <Text style={styles.goLogin}>
          Já tem uma conta?
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Entrar</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
