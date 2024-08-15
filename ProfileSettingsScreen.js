import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};
  return (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.options}>
      </View>
    </ScrollView>
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Sair</Text>
         </TouchableOpacity>
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
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
