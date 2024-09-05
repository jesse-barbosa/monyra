import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './Menu'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username, email } = route.params;
  const [userData, setUserData] = useState(null);
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  useEffect(() => {
    // Fetch user data
    axios.post(`${API_URL}`, {
      action: 'getUserData',
      email
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

  // Function to fetch user goals
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

  // Function to assign a goal to a user
  const assignGoalToUser = (userCod, goalCod) => {
    axios.post(`${API_URL}`, {
      action: 'assignGoalToUser',
      userCod,
      goalCod
    })
    .then(response => {
      const { success, message } = response.data;
      if (success) {
        console.log("Goal assigned to user successfully");
        fetchUserGoals(userCod);
      } else {
        console.error("Error assigning goal to user:", message);
      }
    })
    .catch(error => {
      console.error("Error assigning goal to user:", error);
    });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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

  // Conditionally set image source
  const imageSource = userData ? images[userData.iconUser] || images['default'] : images['default'];

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
            <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings', { username })}>
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
          <TouchableOpacity style={styles.operation} onPress={() => navigation.navigate('Transfer', { username, operation: 'gain' })}>
            <Image style={[styles.btn]} source={require('./assets/img/icons/btn-adicionar-ganho.png')} />
            <Text style={styles.descOperation}>Ganho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => navigation.navigate('Transfer', { username, operation: 'expense' })}>
            <Image style={[styles.btn]} source={require('./assets/img/icons/btn-adicionar-gasto.png')} />
            <Text style={styles.descOperation}>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operation} onPress={() => navigation.navigate('Transfer', { username, operation: 'default' })}>
            <Image style={[styles.btn]} source={require('./assets/img/icons/btn-adicionar.png')} />
            <Text style={styles.descOperation}>Adicionar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          <TouchableOpacity style={styles.cardContainer}>
            <ImageBackground 
              source={require('./assets/img/bg-gradient/gains.png')} 
              style={styles.card}
            >
              <Text style={styles.cardTotal}>{formatCurrency(userData.balanceUser)}</Text>
              <Text style={styles.cardCategory}>Ganhos</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContainer}>
            <ImageBackground 
              source={require('./assets/img/bg-gradient/expenses.png')} 
              style={styles.card}
            >
              <Text style={styles.cardTotal}>{formatCurrency(userData.balanceUser)}</Text>
              <Text style={styles.cardCategory}>Gastos</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
          <View style={styles.goalsTitle}>
            <Text style={styles.secondTitle}>Metas</Text>
          </View>
          <View style={styles.goals}>
            {userGoals.length > 0 ? (
              userGoals.map(goal => (
                <View key={goal.codGoal} style={styles.goalCard}>
                  <TouchableOpacity onPress={() => navigation.navigate('ViewGoal', { goal, username, email } )}>
                  <Text style={styles.goalTitle}>{goal.nameGoal}</Text>
                  <Text style={styles.goalUser}>
                    • {formatUserNames(goal.userNames || [])}
                  </Text>
                  <Text style={styles.goalRemaining}>
                    R${goal.amountRemaining.toFixed(2)}
                  </Text>
                  <Progress.Bar progress={goal.amountSaved / (goal.amountSaved + goal.amountRemaining)} width={290} color="#642de8" style={styles.goalBarProgress}/>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.dataText}>Você não possui metas.</Text>
            )}
            <View style={styles.addGoalCard}>
              <TouchableOpacity onPress={() => navigation.navigate('CreateGoal', { username, email } )} style={styles.addGoalContent}>
              <Icon name='add-circle' size={24} color="#642de8" style={styles.addGoalIcon}/>
                <Text style={styles.addGoalText}>Adicionar Meta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Menu username={username} email={email} />
      </View>
  );
};

const styles = StyleSheet.create({
  // * Estilos pra tela
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    flexGrow: 1,
  },
  // * Estilos para o cabeçalho
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
    color: 'gray',
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.6,
  },
  userImage: {
    width: 40,
    height: 40,
  },
  // * Estilos para o saldo total
  balanceContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  balance: {
    backgroundColor: '#5019d4',
    borderRadius: 30,
    padding: 40,
  },
  balanceTitle: {
    color: '#F7F7F7',
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.7,
  },
  balanceText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
  },
  // * Estilos para as opções de transferências
  operations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  operation: {
    marginHorizontal: 10,
  },
  btn: {
    height: 60,
    width: 60,
  },
  descOperation: {
    textAlign: 'center',
    fontSize:  14,
    color: '#a9a9a9',
    fontWeight: '400',
  },
  // * Estilos para os cards (total de ganhos e gastos)
  cards: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    borderRadius: 15
  },
  card: {
    width: 175,
    height: 170,
    padding: 15,
    alignItems: 'flex-start',
  },
  cardTotal: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  cardCategory: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // * Estilo para as metas do usuário
  goalsTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  secondTitle: {
    color: '#120630',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
  },
  goals: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  goalCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
  },
  goalTitle: {
    fontSize: 18,
    marginBottom: 5,
    opacity: 0.7,
  },
  goalUser: {
    fontSize: 16,
    marginBottom: 5,
    opacity: 0.4,
  },
  goalBarProgress: {
    margin: 10,
    borderWidth: 0,
    backgroundColor: '#C7C7C7',
  },
  goalRemaining: {
    marginLeft: 'auto',
    fontSize: 16,
    color: 'gray',
  },
  // * Estilo para a opção de adicionar uma meta
  addGoalCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 10,
    marginBottom: 15,
  },
  addGoalContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGoalText: {
    fontSize: 18,
    marginBottom: 5,
    opacity: 0.7,
    color: '#642de8',
  },
  addGoalIcon: {
    marginRight: 10,
    opacity: 0.7,
    marginBottom: 'auto',
  },
  // * Estilo para mensagem excepcional
  dataText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
