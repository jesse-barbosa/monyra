import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu'

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};
    const menuItems = [
      { icon:
      <Icon
        name='person'
        size={24}
        color="gray"
        style={styles.eyePassword}
      />,
       label:'Perfil',
       navigateTo: 'ProfileSettings' },
       { icon: 
        <Icon
        name='settings'
        size={24}
        color="gray"
      />,
        label: 'Autenticação' },
      { icon: 
        <Icon
        name='notifications'
        size={24}
        color="gray"
      />,
        label: 'Notificações' },
      { icon: 
        <Icon
        name='wallet'
        size={24}
        color="gray"
        />,
          label: 'Sua carteira' },
    ];
  return (
  <View style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.options}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => navigation.navigate(item.navigateTo, {username})}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>
      ))}
      </View>
    </ScrollView>
    <Menu username={username} />

   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
  },
  options: {
    marginTop: 75,
    marginHorizontal: 10,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  label: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 16,
    color: '#2F1155',
  },
  arrow: {
    marginLeft: 'auto',
    fontSize: 16,
    color: '#000',
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#e52c2c',
    padding: 20,
    marginTop: 'auto',
  },
  buttonLogOut: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  dataText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SettingsScreen;
