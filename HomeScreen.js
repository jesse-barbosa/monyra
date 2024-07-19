import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './config';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params;
  const [userData, setUserData] = useState(null);
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

useEffect(() => {
  // Fetch user data
  axios.post(`${API_URL}`, {
    action: 'getUserData',
    username
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


  const handleOutsideClick = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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
  <TouchableWithoutFeedback onPress={handleOutsideClick}>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titles}>
            <Text style={styles.title}>My Wallet</Text>
            {userData && (
              <Text style={styles.subtitle}>
                {userData.nameUser}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image style={styles.userImage} source={require('./assets/img/icons/user.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>This month you saved:</Text>
          {userData && (
            <Text style={styles.balance}>
              R${userData.balanceUser}
            </Text>
          )}
        </View>
        <View style={styles.topic}>
          <Text style={styles.secondTitle}>Goals</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.goals}>
          {userGoals.length > 0 ? (
            userGoals.map(goal => (
              <View key={goal.codGoal} style={styles.goalCard}>
                <Text style={styles.goalTitle}>{goal.nameGoal}</Text>
                <Text style={styles.goalAmount}>
                  Saved: R${goal.amountSaved.toFixed(2)}
                </Text>
                <Text style={styles.goalRemaining}>
                  Remaining: R${goal.amountRemaining.toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text>No Goals found.</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.operationContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Image style={[styles.btnAdd]} source={require('./assets/img/icons/btn-add.png')} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => navigation.navigate('Transfer', { username, operation: 'Deposito' })}>
              <Text style={styles.dropdownItem}>Depositar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Transfer', { username, operation: 'Saque' })}>
              <Text style={styles.dropdownItem}>Sacar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/wallet-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/chart.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/bell.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/gears.png')} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

};

const styles = StyleSheet.create({
  operationContainer: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    zIndex: 1,
  },
  btnAdd: {
    width: 50,
    height: 50,
  },
  dropdown: {
    position: 'absolute',
    top: -70,
    right: 50,
    width: 130,
    backgroundColor: '#f9f7f7',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    textAlign: 'center',
  },
  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  titles: {
    flexDirection: 'column',
  },
  title: {
    color: '#120630',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '400',
    opacity: 0.6,
  },
  userImage: {
    width: 40,
    height: 40,
  },
  balanceContainer: {
    backgroundColor: '#642de8',
    borderRadius: 50,
    padding: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  balanceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.6,
  },
  balance: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
  topic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  secondTitle: {
    color: '#120630',
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 32,
  },
  viewAll: {
    color: '#6655e3',
    fontWeight: '600',
    fontSize: 16,
  },
  goals: {
    padding: 20,
  },
  goalCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goalAmount: {
    fontSize: 16,
    color: '#007bff',
  },
  goalRemaining: {
    fontSize: 16,
    color: '#dc3545',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5a1cef',
    padding: 20,
    borderRadius: 10,
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

export default HomeScreen;
