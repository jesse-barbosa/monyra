import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from './apiConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu'
import styles from './styles';

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params || {};
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const icons = ['default', 'man', 'woman'];

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

  const currentIcon = icons[selectedIconIndex];
  const imageSource = images[currentIcon] || images['default'];

  return (
  <View style={{...styles.container, paddingTop: 40,}}>
      <Text style={styles.title}>Configurações</Text>
      <ScrollView>
    <View>
      <View style={styles.selectIcon}>
        <TouchableOpacity onPress={handlePreviousIcon} style={styles.arrowButtonIcon}>
          <Icon name="chevron-back-outline" style={styles.arrowIcon} />
        </TouchableOpacity>

        <View style={styles.userImageContainer}>
          <Image style={styles.userImageSettings} source={imageSource} />
        </View>

        <TouchableOpacity onPress={handleNextIcon} style={styles.arrowButtonIcon}>
          <Icon name="chevron-forward-outline" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.nameUserSettings}>{userData.nameUser}</Text>
      </View>
    </View>
    <View style={styles.footerSettings}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    <Menu userData={userData} />
   </View>
  );
};

export default SettingsScreen;
