import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const handleOutsideClick = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
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
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.titles}>
              <Text style={styles.title}>Monyra</Text>
              {userData && (
                <Text style={styles.subtitle}>
                  {userData.nameUser}
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings', { username })}>
              <Image style={styles.userImage} source={imageSource} />
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Seu saldo atual: </Text>
            {userData && (
              <Text style={styles.balance}>
                {formatCurrency(userData.balanceUser)}
              </Text>
            )}
          </View>
          <View style={styles.topic}>
            <Text style={styles.secondTitle}>Metas</Text>
          </View>
          <View style={styles.goals}>
            {userGoals.length > 0 ? (
              userGoals.map(goal => (
                <View key={goal.codGoal} style={styles.goalCard}>
                  <TouchableOpacity onPress={() => navigation.navigate('ViewGoal', { goal } )}>
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
              <Text>Você não possui metas.</Text>
            )}
            <View style={styles.addGoalCard}>
              <TouchableOpacity onPress={() => navigation.navigate('CreateGoal', { username } )} style={styles.addGoalContent}>
              <Icon name='add-circle' size={24} color="#642de8" style={styles.addGoalIcon}/>
                <Text style={styles.addGoalText}>Adicionar Meta...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.operationContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Image style={[styles.btnAdd]} source={require('./assets/img/icons/btn-add.png')} />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => navigation.navigate('Transfer', { username, operation: 'gain' })}>
                <Text style={styles.dropdownItem}>Adicionar Ganho</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Transfer', { username, operation: 'expense' })}>
                <Text style={styles.dropdownItem}>Adicionar Gasto</Text>
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
    right: 15,
    zIndex: 1,
  },
  btnAdd: {
    width: 60,
    height: 60,
  },
  dropdown: {
    position: 'absolute',
    top: -70,
    right: 50,
    width: 130,
    backgroundColor: '#f9f7f7',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
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
    opacity: 0.7,
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
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
  },
  goals: {
    padding: 15,
  },
  goalCard: {
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
  addGoalCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderRadius: 17,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

export default HomeScreen;
