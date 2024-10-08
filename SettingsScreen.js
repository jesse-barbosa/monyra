import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import styles from './styles';
import axios from 'axios'; // Certifique-se de ter axios instalado
import { API_URL } from './apiConfig'; // Certifique-se de ter a URL da API importada

const SettingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params || {};
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [description, setDescription] = useState(userData.descUser || ''); // Carrega a descrição inicial
  const [tempDescription, setTempDescription] = useState(description);

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

  const updateDescription = async () => {
    try {
      // Aqui você pode chamar a API para atualizar a descrição
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

  const currentIcon = icons[selectedIconIndex];
  const imageSource = images[currentIcon] || images['default'];

  // Atualiza a descrição temporária sempre que a descrição original mudar
  useEffect(() => {
    setTempDescription(description);
  }, [description]);

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
              onBlur={updateDescription} // Chama updateDescription ao sair do campo
            />
            <Text style={styles.characterCount}>{tempDescription.length}/200</Text>
          </View>
        </View>

        <View style={styles.footerSettings}>
          <TouchableOpacity style={styles.buttonLogOut} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonLogOutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Menu userData={userData} />
    </View>
  );
};

export default SettingsScreen;
