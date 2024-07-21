import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';

const TransferScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username, operation } = route.params;
  const [userData, setUserData] = useState(null);
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    axios.post(`${API_URL}`, {
      action: 'getUserData',
      username
    })
    .then(response => {
      const { success, message, user } = response.data;
      if (success) {
        setUserData(user);
        fetchUserGoals(user.codUser);
      } else {
        setError(message);
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data.');
    })
    .finally(() => {
      setLoading(false);
    });
  }, [username]);

  const fetchUserGoals = (userCod) => {
    axios.post(`${API_URL}`, {
      action: 'getUserGoals',
      userCod
    })
    .then(response => {
      const { success, message, goals } = response.data;
      if (success) {
        setUserGoals(goals);
      } else {
        setError(message);
      }
    })
    .catch(error => {
      console.error('Error fetching user goals:', error);
      setError('An error occurred while fetching user goals.');
    });
  };

  const handleKeyPress = (key) => {
    if (key === '⌫') {
      setInputValue(inputValue.slice(0, -1));
    } else {
      setInputValue(inputValue + key);
    }
  };

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
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.value}>R$ {inputValue}</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.keyboard}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.key} onPress={() => handleKeyPress(item)}>
                <Text style={styles.keyText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('⌫')}>
              <Image source={require('./assets/img/icons/close-circle.png')} style={styles.keyText}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.ButtonTransfer}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   operation: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 50,
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
    paddingTop: 40,
    padding: 20,
  },
  header: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  keyboard: {
    marginTop: '40%',
    width: 340,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '20%',
    margin: '5%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    color: '#333',
  },
  value: {
    textAlign: 'center',
    color: '#120630',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
  },
});

export default TransferScreen;
