import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './apiConfig';
import styles from './styles';

const CreateGoalScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategoryValue] = useState('');
  const handlePress = () => {
      if( name && description && category){
          navigation.navigate('CreateGoalStep2', { userData, name, description, category });
    } else {
      Alert.alert('Invalid Input', 'Por favor preencha todos os campos.');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerCreateGoal}>
          <Image style={styles.imageFormGoal} source={require('./assets/img/formGoalImage.png')} />
          <Text style={styles.secondaryTitle}>Seus sonhos esperam por você!</Text>
        </View>
        <View style={{...styles.inputs, paddingHorizontal: 15,}}>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={30}
              style={styles.input}
              placeholder="Nome da meta"
              onChangeText={setName}
              value={name}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={50}
              style={styles.input}
              placeholder="Descrição (opcional)"
              onChangeText={setDescription}
              value={description}
            />
        </View>
        <View style={styles.inputContainer}>
              <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue) => setCategoryValue(itemValue)}
              >
              <Picker.Item label="Selecione uma categoria" value="" />
                <Picker.Item label="Moradia" value="Moradia" />
                <Picker.Item label="Alimentação" value="Alimentação" />
                <Picker.Item label="Transporte" value="Transporte" />
                <Picker.Item label="Saúde" value="Saúde" />
                <Picker.Item label="Educação" value="Educação" />
                <Picker.Item label="Lazer" value="Lazer" />
                <Picker.Item label="Vestuário" value="Vestuário" />
                <Picker.Item label="Economia ou Investimentos" value="Economia" />
              </Picker>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateGoalScreen;