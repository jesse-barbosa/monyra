import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './app/Register';
import RegisterStep2 from './app/RegisterStep2';
import Login from './app/Login';
import Home from './app/Home';
import Analytics from './app/Analytics';
import Notifications from './app/Notifications';
import Settings from './app/Settings';
import Transfer from './app/Transfer';
import ViewTransfer from './app/ViewTransfer';
import CreateGoal from './app/CreateGoal';
import ViewGoal from './app/ViewGoal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animationEnabled: true,}} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="RegisterStep2" component={RegisterStep2} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Analytics" component={Analytics} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false, animationEnabled: false,}} />
        <Stack.Screen name="Transfer" component={Transfer} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="ViewTransfer" component={ViewTransfer} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="CreateGoal" component={CreateGoal} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="ViewGoal" component={ViewGoal} options={{ headerShown: false, animationEnabled: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
