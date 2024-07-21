import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from './apiConfig';

const AnalyticsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { username } = route.params || {};

  return (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Recents</Text>
        <View style={styles.goals}>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You received R$100,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowTop.png')} />
                <Text style={styles.goalUser}>'Pay debt'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$20,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowTop.png')} />
                <Text style={styles.goalUser}>'Pay debt'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You spent R$6,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowDown.png')} />
                <Text style={styles.goalUser}>'Buy coffe'</Text>
              </View>
              <View style={styles.goalCard}>
                <Text style={styles.goalTitle}>You received R$100,00</Text>
                    <Image style={[styles.iconNotification]} source={require('./assets/img/icons/arrowTop.png')} />
                <Text style={styles.goalUser}>'Pay debt'</Text>
              </View>
        </View>
    {/* Notificações serão adicionadas dinamicamente aqui */}
    </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/wallet.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/chart.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/bell-filled.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { username })}>
          <Image style={[styles.iconsMenu]} source={require('./assets/img/icons/menu-icons/gears.png')} />
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
    marginTop: 20,
    color: '#2F1155',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
  },
  dataText: {
    fontSize: 16,
  },
  goals: {
    marginTop: 20,
    padding: 15,
  },
  goalCard: {
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconNotification: {
  position: 'absolute',
  top: '65%',
  right: 20,
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

export default AnalyticsScreen;
