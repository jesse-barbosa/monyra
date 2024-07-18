import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './config';

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};

  return (
  <View style={styles.container}>
    <ScrollView>
    {/* Notificações serão adicionadas dinamicamente aqui */}
      <Text style={styles.dataText}>Bem-vindo à página de Settings</Text>
      {username && <Text style={styles.dataText}>Usuário: {username}</Text>}
     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonLogOut}>Log Out</Text>
     </TouchableOpacity>
    </ScrollView>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataText: {
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    borderRadius: 15,
    backgroundColor: '#e52c2c',
    padding: 20,
  },
  buttonLogOut: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
