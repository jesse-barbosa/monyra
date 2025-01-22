import React, { useState, useCallback } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../apiConfig';
import Menu from './components/Menu';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native';
import styles from '../styles/global';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params;
  const [userGoals, setUserGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(userData?.balanceUser || 0);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [userIcon, setUserIcon] = useState(userData?.iconUser || 'default');
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

  const fetchUserIcon = useCallback((userCod) => {
    axios
      .post(`${API_URL}`, {
        action: 'getUserIcon',
        userCod: userCod,
      })
      .then((response) => {
        const { success, icon } = response.data;
        if (success) {
          setUserIcon(icon); // Atualiza o ícone do usuário
        } else {
          console.error('Error fetching user icon:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching user icon:', error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.codUser) {
        fetchUserGoals(userData.codUser);
        fetchUserTransactions(userData.nameUser);
        fetchUserBalance(userData.codUser);
        fetchUserIcon(userData.codUser);
      }
    }, [userData, fetchUserGoals, fetchUserTransactions, fetchUserBalance, fetchUserIcon])
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

  const imageSource = images[userIcon] || images['default'];

  const openGoalModal = (goal) => {
    setSelectedGoal(goal);
    setGoalModalVisible(true);
  };

  const closeGoalModal = () => {
    setGoalModalVisible(false);
    setSelectedGoal(null);
  };
  const editGoal = () => {
    setGoalModalVisible(false);
    navigation.navigate('ViewGoal', { userData: userData, goal: selectedGoal });
  };
  return (
    <View style={{...styles.container, paddingTop: 40,}}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.header}>
          <View style={styles.titles}>
            <Text style={styles.titleApp}>Monyra</Text>
            {userData && <Text style={styles.username}>{userData.nameUser}</Text>}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings', { userData })}>
            <Image style={styles.userIcon} source={imageSource} />
          </TouchableOpacity>
        </View>
        <View style={styles.balance}>
            <Text style={styles.balanceTitle}>Saldo Total</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.balanceValue}>{balanceVisible ? formatCurrency(balance) : '****'}</Text>
              <TouchableOpacity 
                onPress={() => setBalanceVisible(!balanceVisible)}
                style={{ marginLeft: 'auto', paddingHorizontal: 10 }}
              >
                <Icon name={balanceVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.operations}>
          <TouchableOpacity
            style={styles.operation}
            onPress={() => navigation.navigate('Transfer', { userData, operation: 'gain' })}
          >
            <Icon name="arrow-up-outline" size={30} color="#000" style={styles.operationIcon} />
            <Text style={styles.descOperation}>Ganho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operation}
            onPress={() => navigation.navigate('Transfer', { userData, operationHome: 'expense' })}
          >
            <Icon name="arrow-down-outline" size={30} color="#000" style={styles.operationIcon} />
            <Text style={styles.descOperation}>Gasto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.operation}
            onPress={() => navigation.navigate('CreateGoal', { username: userData.nameUser, email: userData.email })}
          >
            <Icon name="add-circle-outline" size={30} color="#000" style={styles.operationIcon} />
            <Text style={styles.descOperation}>Adicionar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsHome}>
          <TouchableOpacity style={{...styles.cardContainerHome, backgroundColor: '#BAE1B3',}}>
            <Text style={styles.cardTotalHome}>{formatCurrency(totalGains)}</Text>
            <Text style={styles.cardTypeHome}>Ganhos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.cardContainerHome, backgroundColor: '#E7AFAF',}}>
            <Text style={styles.cardTotalHome}>{formatCurrency(totalExpenses)}</Text>
            <Text style={styles.cardTypeHome}>Gastos</Text>
          </TouchableOpacity>
        </View>
          <Text style={styles.title}>Metas</Text>
          {userGoals.length > 0 ? (
            userGoals.map((goal) => (
              <View key={goal.codGoal} style={styles.goal}>
                <TouchableOpacity onPress={() => openGoalModal(goal)}>
                  <Text style={styles.goalTitle}>{goal.nameGoal}</Text>
                  <Text style={styles.goalRemainingValue}>R${goal.amountRemaining.toFixed(2)}</Text>
                  <Progress.Bar
                    progress={goal.amountSaved / (goal.amountSaved + goal.amountRemaining)}
                    width={325}
                    height={8}
                    color="#2E4053"
                    unfilledColor="#C7C7C7"
                    style={styles.goalBarProgressHome}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.dataText}>Você não possui metas.</Text>
          )}
          {/* Modal de metas */}
          <Modal
            visible={isGoalModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeGoalModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedGoal && (
                  <>
                    <Text style={styles.title}>{selectedGoal.nameGoal}</Text>
                    <View style={styles.modalMain}>
                      <View style={styles.field}>
                          <Text style={styles.labelModal}>Valor salvo:</Text>
                        <Text style={styles.value}> R${selectedGoal.amountSaved.toFixed(2)}</Text>
                      </View>
                      <View style={styles.field}>
                          <Text style={styles.labelModal}>Valor restante:</Text>
                      <Text style={styles.value}>R${selectedGoal.amountRemaining.toFixed(2)}</Text>
                      </View>
                    </View>
                    <Progress.Bar
                      progress={selectedGoal.amountSaved / (selectedGoal.amountSaved + selectedGoal.amountRemaining)}
                      width={340}
                      height={25}
                      color="#2E4053"
                      unfilledColor="#e0e0e0"
                      style={styles.modalProgressBar}
                    />
                    <TouchableOpacity onPress={editGoal} style={styles.editButton}>
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeGoalModal} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
          <View style={styles.addGoal}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateGoal', { username: userData.nameUser, email: userData.email })}
              style={styles.addGoalContent}
            >
              <Icon name="add-circle" size={24} color="#000" style={styles.addGoalIcon} />
              <Text style={styles.addGoalText}>Adicionar Meta</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
      <Menu userData={userData} />
    </View>
  );
};

export default HomeScreen;
