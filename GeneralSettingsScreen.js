import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import { useNavigation } from '@react-navigation/native';

const GeneralSettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username, email } = route.params || {};
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Ocorreu um erro ao buscar os dados:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.themeSelector}>Tema:</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 10,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },

  button: {
    borderRadius: 15,
    backgroundColor: '#000',
    padding: 20,
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GeneralSettingsScreen;
