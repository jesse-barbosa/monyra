import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import Menu from './Menu'

const NotificationsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (username) {
      fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'getUserTransactions', username }),
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
  }, [username]);

  const handlePress = (transaction) => {
    navigation.navigate('ViewTransfer', {
      username,
      transaction,
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Recentes</Text>
        <View style={styles.notifications}>
          {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <View key={index} style={styles.notificationsCard}>
              <TouchableOpacity onPress={() => handlePress(transaction)}>
              <View style={styles.notificationsContent}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationDate}>{transaction.created_at}</Text>
                  <Text style={styles.notificationTitle}>{transaction.typeTransaction === 'expense' ? 'Você enviou' : 'Você recebeu'} R$ {transaction.valueTransaction}</Text>
                  <Text style={styles.notificationText}>"{transaction.descTransaction}"</Text>
                </View>
                <View style={styles.notificationIcon}>
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
      <Menu username={username} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },
  notifications: {
    marginTop: 10,
    padding: 20,
  },
  notificationsCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
  },
  notificationsContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    marginTop: 7,
    marginBottom: 7,
  },
  notificationText: {
    opacity: 0.6,
  },
  notificationDate: {
    opacity: 0.5,
  },
  notificationIcon: {
    marginLeft: 10,
  },
  dataText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default NotificationsScreen;
