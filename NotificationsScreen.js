import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Recentes</Text>
        <View style={styles.notifications}>
          {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <View key={index} style={styles.notificationsCard}>
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
            </View>
          ))
          
        ) : (
          <Text style={styles.dataText}>Nenhum notificação encontrada</Text>
        )}
        </View>
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/wallet.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/chart.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/bell-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { username })}>
          <Image style={styles.iconsMenu} source={require('./assets/img/icons/menu-icons/gears.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 5,
    marginBottom: 10,
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
  },
  notifications: {
    marginTop: 10,
  },
  notificationsCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5019d4',
    padding: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  menuItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsMenu: {
    height: 30,
    width: 30,
  },
});

export default NotificationsScreen;
