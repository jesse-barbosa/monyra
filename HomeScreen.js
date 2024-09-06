import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './Menu';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params;
  const [userGoals, setUserGoals] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserGoals = (userCod) => {
    axios.post(`${API_URL}`, {
      action: 'getUserGoals',
      userCod: userCod, 
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

  // useEffect para buscar metas assim que o componente é montado
  useEffect(() => {
    if (userData && userData.codUser) {
      fetchUserGoals(userData.codUser);
    }
  }, [userData]);

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(value);
  };

  const formatUserNames = (userNames) => {
    return userNames.join(', ');
  };

  const images = {
    default: require('./assets/img/icons/profile/default.png'),
    man: require('./assets/img/icons/profile/man.png'),
    woman: require('./assets/img/icons/profile/woman.png'),
  };

  const imageSource = userData ? images[userData.iconUser] || images['default'] : images['default'];
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.header}>
          <View style={styles.titles}>
            <Text style={styles.title}>Monyra</Text>
            {userData && (
              <Text style={styles.username}>
                {userData.nameUser}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings', { userData })}>
              <Image style={styles.userImage} source={imageSource} />
            </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.balance}>
            <Text style={styles.balanceTitle}>Saldo Total</Text>
            <Text style={styles.balanceText}>{formatCurrency(userData.balanceUser)}</Text>
          </View>
        </View>
        <View style={styles.operations}>
          <TouchableOpacity style={styles.operation} onPress={() => navigation.navigate('Transfer', {userData, operation: 'gain' })}>
            <Icon name="arrow-up-outline" size={30} color="#000" style={styles.btn} />
            <Text style={styles.descOperation}>Ganho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => navigation.navigate('Transfer', {userData, operation: 'expense' })}>
            <Icon name="arrow-down-outline" size={30} color="#000" style={styles.btn} />
            <Text style={styles.descOperation}>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => navigation.navigate('Transfer', {userData, operation: 'default' })}>
            <Icon name="add-circle-outline" size={30} color="#000" style={styles.btn} />
            <Text style={styles.descOperation}>Adicionar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          <TouchableOpacity style={styles.cardContainer}>
            <Text style={styles.cardTotal}>{formatCurrency(userData.balanceUser)}</Text>
            <Text style={styles.cardCategory}>Ganhos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContainer}>
            <Text style={styles.cardTotal}>{formatCurrency(userData.balanceUser)}</Text>
            <Text style={styles.cardCategory}>Gastos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.goalsTitle}>
          <Text style={styles.secondTitle}>Metas</Text>
        </View>
        <View style={styles.goals}>
          {userGoals.length > 0 ? (
            userGoals.map(goal => (
              <View key={goal.codGoal} style={styles.goal}>
                <TouchableOpacity onPress={() => navigation.navigate('ViewGoal', { goal, username: userData.nameUser, email: userData.email })}>
                  <Text style={styles.goalTitle}>{goal.nameGoal}</Text>
                  <Text style={styles.goalUser}>
                    • {formatUserNames(goal.userNames || [])}
                  </Text>
                  <Text style={styles.goalRemainingValue}>
                    R${goal.amountRemaining.toFixed(2)}
                  </Text>
                  <Progress.Bar progress={goal.amountSaved / (goal.amountSaved + goal.amountRemaining)} width={290} color="#000" style={styles.goalBarProgress}/>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dataText}>Você não possui metas.</Text>
          )}
          <View style={styles.addGoalCard}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateGoal', { username: userData.nameUser, email: userData.email })} style={styles.addGoalContent}>
              <Icon name='add-circle' size={24} color="#000" style={styles.addGoalIcon}/>
              <Text style={styles.addGoalText}>Adicionar Meta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Menu userData={userData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  title: {
    color: '#120630',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
  },
  username: {
    color: '000',
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.5,
  },
  userImage: {
    width: 50,
    height: 50,
  },
  balanceContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  balance: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 35,
    borderRadius: 15,
  },
  balanceTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.7,
    fontFamily: 'monospace',
  },
  balanceText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  operation: {
    width: 100,
    height: 95,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderBottomColor: '#000',
    borderRightColor: '#000',
  },
  btn: {
    marginBottom: 5,
  },
  descOperation: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    opacity: 0.4,
  },
  cards: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: 170,
    height: 110,
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#ededed',
    alignItems: 'flex-start',
  },
  cardTotal: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  cardCategory: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'monospace',

  },
  goalsTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  secondTitle: {
    color: '#000',
    fontWeight: '700',
    marginLeft: 10,
    fontSize: 24,
    lineHeight: 32,
  },
  goals: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  goal: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderBottomColor: '#000',
    borderRightColor: '#000',
  },
  goalTitle: {
    marginVertical: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    opacity: 0.8,
  },
  goalUser: {
    marginVertical: 4,
    fontSize: 14,
    color: '#a9a9a9',
  },
  goalRemainingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  goalBarProgress: {
    marginTop: 10,
    borderWidth: 0,
    borderColor: '#000',
  },
  addGoalCard: {
    marginVertical: 15,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#ededed',
  },
  addGoalContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGoalIcon: {
    marginRight: 5,
  },
  addGoalText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  dataText: {
    color: '#120630',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
