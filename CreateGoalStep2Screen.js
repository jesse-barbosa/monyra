import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from './apiConfig';
import styles from './styles';

const CreateGoalScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData, name, description, category } = route.params;
  const [amountRemaining, setAmountRemaining] = useState('');
  const [amountSaved, setAmountSaved] = useState('');

  const handlePress = () => {
      if( name && description && category && amountRemaining && amountSaved){
        axios.post(`${API_URL}`, {
          action: 'createGoal',
          name,
          category,
          description,
          amountSaved,
          amountRemaining,
        })
        .then(response => {
          const { success, message, user } = response.data;
          if (success) {
            navigation.navigate('Home', { userData });
          } else {
            Alert.alert('Create Failed', message);
          }
        })
        .catch(error => {
          console.error('Error creating in:', error);
          Alert.alert('Create Error', 'An error occurred while creating goal.');
        });
    } else {
      Alert.alert('Invalid Input', 'Por favor preencha todos os campos.');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerCreateGoal}>
          <Text style={styles.secondaryTitle}>Quase lá...</Text>
          <Image style={styles.imageFormGoal} source={require('./assets/img/formGoalImage.png')} />
        </View>
        <View style={{...styles.inputs, paddingHorizontal: 15,}}>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={11}
              style={styles.input}
              placeholder="Quanto você quer juntar?"
              onChangeText={setAmountRemaining}
              value={amountRemaining}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              maxLength={11}
              style={styles.input}
              placeholder="Quanto você já tem?"
              onChangeText={setAmountSaved}
              value={amountSaved}
            />
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