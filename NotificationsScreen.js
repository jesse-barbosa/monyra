import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './Menu'
import styles from './styles';

const NotificationsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params || {};
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (userData) {
      fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'getUserTransactions', username:userData.nameUser }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTransactions(data.transactions);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
    }
  }, [userData.userName]);

  const handlePress = (transaction) => {
    navigation.navigate('ViewTransfer', {
      username: userData.nameUser,
      transaction,
    })
  }
  return (
    <SafeAreaView style={{...styles.container, paddingTop: 40}}>
      <ScrollView>
        <Text style={styles.title}>Recentes</Text>
        <View style={styles.transfers}>
          {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <View key={index} style={styles.transferCard}>
              <TouchableOpacity onPress={() => handlePress(transaction)}>
              <View style={styles.transferContent}>
                <View style={styles.transferInfo}>
                  <Text style={styles.transferDate}>{transaction.created_at}</Text>
                  <Text style={styles.transferTitle}>{transaction.typeTransaction === 'expense' ? 'Você enviou' : 'Você recebeu'} R$ {transaction.valueTransaction}</Text>
                  <Text style={styles.transferText}>"{transaction.descTransaction}"</Text>
                </View>
                <View style={styles.transferIcon}>
                  <Image source={transaction.typeTransaction === 'expense' ? require('./assets/img/icons/arrowDown.png') : require('./assets/img/icons/arrowUp.png')} />
                </View>
              </View>
              </TouchableOpacity>
            </View>
          ))
          
        ) : (
          <Text style={styles.dataText}>Nenhum notificação encontrada</Text>
        )}
        </View>
      </ScrollView>
      <Menu userData={userData} />
    </SafeAreaView>
  );
};

export default NotificationsScreen;