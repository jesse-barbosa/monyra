import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileSettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  const icons = ['default', 'man', 'woman'];

  useEffect(() => {
    axios.post(`${API_URL}`, {
      action: 'getUserData',
      username
    })
    .then(response => {
      const { success, message, user } = response.data;
      if (success) {
        setUserData(user);
        const initialIconIndex = icons.indexOf(user.iconUser);
        setSelectedIconIndex(initialIconIndex >= 0 ? initialIconIndex : 0);
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

  const handleNextIcon = () => {
    setSelectedIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
  };

  const handlePreviousIcon = () => {
    setSelectedIconIndex((prevIndex) => (prevIndex - 1 + icons.length) % icons.length);
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

  const currentIcon = icons[selectedIconIndex];
  const imageSource = images[currentIcon] || images['default'];

  return (
    <View style={styles.container}>
      <View style={styles.selectIcon}>
        <TouchableOpacity onPress={handlePreviousIcon} style={styles.arrowButton}>
          <Icon name="chevron-back-outline" style={styles.arrow} />
        </TouchableOpacity>

        <View style={styles.userImageContainer}>
          <Image style={styles.userImage} source={imageSource} />
        </View>

        <TouchableOpacity onPress={handleNextIcon} style={styles.arrowButton}>
          <Icon name="chevron-forward-outline" style={styles.arrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.nameUser}>{userData.nameUser}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
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
  selectIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
  },
  nameUser: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 26,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#666666',
  },
  arrowButton: {
    padding: 10,
  },
  arrow: {
    fontSize: 40,
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

export default ProfileSettingsScreen;
