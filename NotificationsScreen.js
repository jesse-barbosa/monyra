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
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/wallet.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/chart.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/bell-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/gears.png')} />
        </TouchableOpacity>
      </View>
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
