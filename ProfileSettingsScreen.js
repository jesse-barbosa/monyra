import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileSettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username, email } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const icons = ['default', 'man', 'woman'];




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
