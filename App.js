import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AnalyticsScreen from './AnalyticsScreen';
import NotificationsScreen from './NotificationsScreen';
import SettingsScreen from './SettingsScreen';
import TransferScreen from './TransferScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Transfer" component={TransferScreen} options={{ animationEnabled: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
