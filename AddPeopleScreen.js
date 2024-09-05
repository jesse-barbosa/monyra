import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';

const ViewTransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { goal, username } = route.params;
  const [email, setEmail] = useState('');

  const handlePress = () => {
      if(email){
        axios.post(`${API_URL}`, {
          action: 'addPeopleToGoal',
          email
        })
        .then(response => {
          const { success, message, user } = response.data;
          if (success) {
            navigation.navigate('Home', { username });
          } else {
            Alert.alert('Add Failed', message);
          }
        })
        .catch(error => {
          console.error('Error adding in:', error);
          Alert.alert('Add Error', 'An error occurred while adding people.');
        });
    } else {
      Alert.alert('Invalid Input', 'Please enter both username and email.');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
            <Text style={styles.title}>Nada melhor que compartilhar objetivos com amigos.</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
              <TextInput
                maxLength={50}
                style={styles.input}
                placeholder="Email do usuário"
                onChangeText={setEmail}
                value={email}
              />
          </View>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handlePress}>
          <Text style={styles.ButtonTransfer}>Confirmar</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: '15%',
    marginBottom: '5%',
    width: '100%',
  },
  header: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
  Button: {
    backgroundColor: '#6630F3',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  ButtonTransfer: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: '#120630',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },



  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    flex: 1,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingTop: 120,
    paddingBottom: 30,
    marginHorizontal: 10,
    marginVertical: 40,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoRowDescription: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#666666',
    marginLeft: 10,
    flex: 1,
  },
  value: {
    fontSize: 18,
    color: '#545454',
    fontWeight: 'bold',
    marginLeft: 10,
    flexShrink: 1,
  },
  valueDescription: {
    fontSize: 18,
    color: '#545454',
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'right',
    flex: 1,
    marginTop: 5,
  },
  goalBarProgress: {
    marginTop: 'auto',
    height: 30,
    borderWidth: 0,
    backgroundColor: '#C7C7C7',
  },
  goalRemaining: {
    marginLeft: 'auto',
    fontSize: 16,
    color: 'gray',
  },
  saveButton: {
    backgroundColor: '#6630F3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addPeopleCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 10,
    marginVertical: 15,
  },
  addPeopleContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPeopleText: {
    fontSize: 18,
    marginBottom: 5,
    opacity: 0.7,
    color: '#642de8',
  },
  addPeopleIcon: {
    marginRight: 10,
    opacity: 0.7,
    marginBottom: 'auto',
  },
});

export default ViewTransferScreen;
