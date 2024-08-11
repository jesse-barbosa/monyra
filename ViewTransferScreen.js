import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};

  return (
  <View style={styles.container}>
      <Text style={styles.title}>Enviado R$30,00</Text>
      <View style={styles.card}>
            <Text style={styles.cardTitle}>R$-300</Text>
         </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    marginBottom: 'auto',
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
  },
  dataText: {
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#EEEEEE',
    height: '80%',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
