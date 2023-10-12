import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import BookingScreen from './BookingScreen';

const Stack = createStackNavigator();

  export default function App() {
    return (
      <NavigationContainer>
  <Stack.Navigator initialRouteName="Welcome">
    
    <Stack.Screen name="Registration" component={RegistrationScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Booking" component={ BookingScreen} />

     
    
  </Stack.Navigator>
</NavigationContainer>

    );
  }
