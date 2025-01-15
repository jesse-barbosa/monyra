import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './app/RegisterScreen';
import RegisterScreenStep2 from './app/RegisterStep2Screen';
import LoginScreen from './app/LoginScreen';
import HomeScreen from './app/HomeScreen';
import AnalyticsScreen from './app/AnalyticsScreen';
import NotificationsScreen from './app/NotificationsScreen';
import SettingsScreen from './app/SettingsScreen';
import TransferScreen from './app/TransferScreen';
import ViewTransferScreen from './app/ViewTransferScreen';
import CreateGoalScreen from './app/CreateGoalScreen';
import CreateGoalStep2Screen from './app/CreateGoalStep2Screen';
import ViewGoalScreen from './app/ViewGoalScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animationEnabled: true,}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="RegisterStep2" component={RegisterScreenStep2} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, animationEnabled: false,}} />
        <Stack.Screen name="Transfer" component={TransferScreen} options={{ headerTitle: "Transferir", animationEnabled: false, }} />
        <Stack.Screen name="ViewTransfer" component={ViewTransferScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="CreateGoal" component={CreateGoalScreen} options={{ headerTitle: "Criar meta", animationEnabled: false, }} />
        <Stack.Screen name="CreateGoalStep2" component={CreateGoalStep2Screen} options={{ headerTitle: "Criar meta", animationEnabled: false, }} />
        <Stack.Screen name="ViewGoal" component={ViewGoalScreen} options={{ headerTitle: "Visualizar", headerShown: true, animationEnabled: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
