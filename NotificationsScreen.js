import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './config';

const AnalyticsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};

  return (
  <View style={styles.container}>
    <ScrollView>
    {/* Notificações serão adicionadas dinamicamente aqui */}
      <Text style={styles.dataText}>Bem-vindo à página de Notifications</Text>
      {username && <Text style={styles.dataText}>Usuário: {username}</Text>}
    </ScrollView>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 16,
  },
  menu: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5a1cef',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  menuItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsMenu: {
    height: 30,
    width: 30,
  },

});

export default AnalyticsScreen;
