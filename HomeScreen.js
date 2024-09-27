import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importar o useFocusEffect
import { API_URL } from './apiConfig';
import Menu from './Menu';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params;
  const [userGoals, setUserGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(userData?.balanceUser || 0); // Estado para o saldo do usuário
  const [error, setError] = useState(null);

  // Função para buscar as metas do usuário
  const fetchUserGoals = useCallback((userCod) => {
    axios
      .post(`${API_URL}`, {
        action: 'getUserGoals',
        userCod: userCod,
      })
      .then((response) => {
        const { success, message, goals } = response.data;
        if (success) {
          setUserGoals(goals);
        } else {
          setError(message);
        }
      })
      .catch((error) => {
        console.error('Error fetching user goals:', error);
        setError('An error occurred while fetching user goals.');
      });
  }, []);

  // Função para buscar as transações do usuário
  const fetchUserTransactions = useCallback((username) => {
    axios
      .post(`${API_URL}`, {
        action: 'getUserTransactions',
        username: username,
      })
      .then((response) => {
        const { success, transactions } = response.data;
        if (success) {
          setTransactions(transactions);
        }
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  // Função para buscar o saldo atualizado do usuário
  const fetchUserBalance = useCallback((userCod) => {
    axios
      .post(`${API_URL}`, {
        action: 'getUserBalance',
        userCod: userCod,
      })
      .then((response) => {
        const { success, balance } = response.data;
        if (success) {
          setBalance(balance);
        }
      })
      .catch((error) => {
        console.error('Error fetching user balance:', error);
      });
  }, []);

  // Utilize o useFocusEffect para atualizar os dados sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      if (userData && userData.codUser) {
        fetchUserGoals(userData.codUser);
        fetchUserTransactions(userData.nameUser);
        fetchUserBalance(userData.codUser); // Atualiza o saldo total do usuário
      }
    }, [userData, fetchUserGoals, fetchUserTransactions, fetchUserBalance])
  );

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatter.format(value);
  };

  const calculateMonthlyTotals = () => {
    const currentMonth = new Date().getMonth();

    const totalGains = transactions
      .filter(
        (transaction) =>
          transaction.typeTransaction === 'gain' &&
          new Date(transaction.created_at).getMonth() === currentMonth
      )
      .reduce((sum, transaction) => sum + transaction.valueTransaction, 0);

    const totalExpenses = transactions
      .filter(
        (transaction) =>
          transaction.typeTransaction === 'expense' &&
          new Date(transaction.created_at).getMonth() === currentMonth
      )
      .reduce((sum, transaction) => sum + transaction.valueTransaction, 0);

    return { totalGains, totalExpenses };
  };

  const { totalGains, totalExpenses } = calculateMonthlyTotals();

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
            <Text style={styles.titleApp}>Monyra</Text>
            {userData && <Text style={styles.username}>{userData.nameUser}</Text>}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings', { userData })}>
            <Image style={styles.userImage} source={imageSource} />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <View style={styles.balance}>
            <Text style={styles.balanceTitle}>Saldo Total</Text>
            <Text style={styles.balanceText}>{formatCurrency(balance)}</Text>
          </View>
        </View>
        <View style={styles.operations}>
          <TouchableOpacity
            style={styles.operation}
            onPress={() => navigation.navigate('Transfer', { userData, operation: 'gain' })}
          >
            <Icon name="arrow-up-outline" size={30} color="#000" style={styles.btn} />
            <Text style={styles.descOperation}>Ganho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operation}
            onPress={() => navigation.navigate('Transfer', { userData, operation: 'expense' })}
          >
            <Icon name="arrow-down-outline" size={30} color="#000" style={styles.btn} />
            <Text style={styles.descOperation}>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operation}
            onPress={() => navigation.navigate('CreateGoal', { username: userData.nameUser, email: userData.email })}
          >
            <Icon name="add-circle-outline" size={30} color="#000" style={styles.btn} />
            <Text style={styles.descOperation}>Adicionar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsHome}>
          <TouchableOpacity style={styles.cardHomeContainer}>
            <Text style={styles.cardTotal}>{formatCurrency(totalGains)}</Text>
            <Text style={styles.cardCategory}>Ganhos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardHomeContainer}>
            <Text style={styles.cardTotal}>{formatCurrency(totalExpenses)}</Text>
            <Text style={styles.cardCategory}>Gastos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.goalsTitle}>
          <Text style={styles.title2}>Metas</Text>
        </View>
        <View style={styles.goals}>
          {userGoals.length > 0 ? (
            userGoals.map((goal) => (
              <View key={goal.codGoal} style={styles.goal}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ViewGoal', {
                      goal,
                      username: userData.nameUser,
                      email: userData.email,
                    })
                  }
                >
                  <Text style={styles.goalTitle}>{goal.nameGoal}</Text>
                  <Text style={styles.goalRemainingValue}>R${goal.amountRemaining.toFixed(2)}</Text>
                  <Progress.Bar
                    progress={goal.amountSaved / (goal.amountSaved + goal.amountRemaining)}
                    width={290}
                    color="#000"
                    unfilledColor="#e0e0e0"
                    style={styles.goalBarProgress}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dataText}>Você não possui metas.</Text>
          )}
          <View style={styles.addGoalCard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateGoal', { username: userData.nameUser, email: userData.email })}
              style={styles.addGoalContent}
            >
              <Icon name="add-circle" size={24} color="#000" style={styles.addGoalIcon} />
              <Text style={styles.addGoalText}>Adicionar Meta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Menu userData={userData} />
    </View>
  );
};

export default HomeScreen;
