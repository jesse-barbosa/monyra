import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './components/Menu';
import styles from '../styles/global';
import axios from 'axios';
import { API_URL } from './apiConfig';

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params || {};
  const icons = ['default', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6', 'icon7', 'icon8', 'icon9', 'icon10', 'icon11', 'icon12', 'icon13'];
  const [selectedIconIndex, setSelectedIconIndex] = useState(icons.indexOf(userData.iconUser) || 0); // Carrega o índice do ícone salvo
  const [description, setDescription] = useState(userData.descUser || ''); // Carrega a descrição inicial
  const [tempDescription, setTempDescription] = useState(description);

  const images = {
    default: require('../assets/img/icons/profile/default.png'),
    icon2: require('../assets/img/icons/profile/icon2.png'),
    icon3: require('../assets/img/icons/profile/icon3.png'),
    icon4: require('../assets/img/icons/profile/icon4.png'),
    icon5: require('../assets/img/icons/profile/icon5.png'),
    icon6: require('../assets/img/icons/profile/icon6.png'),
    icon7: require('../assets/img/icons/profile/icon7.png'),
    icon8: require('../assets/img/icons/profile/icon8.png'),
    icon9: require('../assets/img/icons/profile/icon9.png'),
    icon10: require('../assets/img/icons/profile/icon10.png'),
    icon11: require('../assets/img/icons/profile/icon11.png'),
    icon12: require('../assets/img/icons/profile/icon12.png'),
    icon13: require('../assets/img/icons/profile/icon13.png'),
  };

  const handleNextIcon = () => {
    setSelectedIconIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % icons.length;
      updateUserIcon(newIndex); // Atualiza o ícone ao selecionar um novo
      return newIndex;
    });
  };

  const handlePreviousIcon = () => {
    setSelectedIconIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + icons.length) % icons.length;
      updateUserIcon(newIndex); // Atualiza o ícone ao selecionar um novo
      return newIndex;
    });
  };

  // Função para atualizar a descrição
  const updateDescription = async () => {
    try {
      const response = await axios.post(`${API_URL}`, {
        action: 'updateUserDescription',
        userId: userData.codUser,
        description: tempDescription,
      });

      if (response.data.success) {
        setDescription(tempDescription); // Atualiza a descrição exibida
        Alert.alert('Descrição atualizada com sucesso!'); // Mensagem de sucesso
      } else {
        Alert.alert('Erro', response.data.message || 'Ocorreu um erro ao atualizar a descrição.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar a descrição. Tente novamente.'); // Mensagem de erro
    }
  };

  // Função para atualizar o ícone
  const updateUserIcon = async (index) => {
    try {
      const response = await axios.post(`${API_URL}`, {
        action: 'updateUserIcon',
        userId: userData.codUser,
        icon: icons[index],
      });

      if (response.data.success) {
        // Ícone atualizado com sucesso, você pode adicionar uma mensagem se necessário
      } else {
        Alert.alert('Erro', response.data.message || 'Ocorreu um erro ao atualizar o ícone.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar o ícone. Tente novamente.'); // Mensagem de erro
    }
  };

  const currentIcon = icons[selectedIconIndex];
  const imageSource = images[currentIcon] || images['default'];

  // Atualiza a descrição temporária sempre que a descrição original mudar
  useEffect(() => {
    setTempDescription(description);
  }, [description]);

  const fetchUserIcon = useCallback((userCod) => {
    axios
      .post(`${API_URL}`, {
        action: 'getUserIcon',
        userCod: userCod,
      })
      .then((response) => {
        const { success, icon } = response.data;
        if (success) {
          const iconIndex = icons.indexOf(icon);
          setSelectedIconIndex(iconIndex !== -1 ? iconIndex : 0); // Atualiza o ícone
        } else {
          console.error('Error fetching user icon:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching user icon:', error);
      });
  }, []);

  // Função para buscar a descrição do usuário
  const fetchUserDescription = useCallback((userCod) => {
    axios
      .post(`${API_URL}`, {
        action: 'getUserDescription', // Esta ação deve ser tratada no backend
        userCod: userCod,
      })
      .then((response) => {
        const { success, description } = response.data;
        if (success) {
          setDescription(description); // Atualiza a descrição com o valor retornado
          setTempDescription(description); // Também atualiza a descrição temporária
        } else {
          console.error('Erro ao buscar a descrição do usuário:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar a descrição do usuário:', error);
      });
  }, []);

  // Atualiza o ícone do usuário sempre que a página é recarregada
  useFocusEffect(
    useCallback(() => {
      if (userData && userData.codUser) {
        fetchUserIcon(userData.codUser);
        fetchUserDescription(userData.codUser);
      }
    }, [userData, fetchUserIcon, fetchUserDescription])
  );  

  return (
    <View style={{ ...styles.container, paddingTop: 40 }}>
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
            <Text style={styles.nameUserSettings}>{userData.nameUser || 'Usuário'}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Adicione uma descrição..."
              multiline={true}
              maxLength={200}
              value={tempDescription}
              onChangeText={(text) => setTempDescription(text)}
              onBlur={updateDescription}
            />
            <Text style={styles.characterCount}>{tempDescription.length}/200</Text>
          </View>
        </View>

        <View style={styles.footerSettings}>
          <TouchableOpacity style={styles.logOutbutton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logOutbuttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Menu userData={userData} />
    </View>
  );
};

export default SettingsScreen;
