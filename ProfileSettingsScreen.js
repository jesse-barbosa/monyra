import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data
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

  const images = {
    default: require('./assets/img/icons/profile/default.png'),
    man: require('./assets/img/icons/profile/man.png'),
    woman: require('./assets/img/icons/profile/woman.png'),

  };
  // Conditionally set image source
  const imageSource = userData ? images[userData.iconUser] || images['default'] : images['default'];

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
