import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = () => {
    if (username && password && email) {
      axios.post(`${API_URL}`, {
        action: 'register',
        username,
        password,
        email
      })
      .then(response => {
        const { success, message } = response.data;
        if (success) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Registration Failed', message);
        }
      })
      .catch(error => {
        console.error('Error registering:', error);
        Alert.alert('Registration Error', 'An error occurred while registering.');
      });
    } else {
      Alert.alert('Invalid Input', 'Please fill in all fields.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Image source={require('./assets/img/icons/form-icons/profile.png')} style={styles.image} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={setUsername}
              value={username}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image source={require('./assets/img/icons/form-icons/key-square.png')} style={styles.image} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
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
          <View style={styles.inputContainer}>
            <Image source={require('./assets/img/icons/form-icons/email.png')} style={styles.image} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handleRegister}>
          <Text style={styles.ButtonLogin}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.goLogin}>
          Already have an account?
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Login</Text>
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
  ButtonLogin: {
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
