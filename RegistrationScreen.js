import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RegistrationScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const serverUrl = 'https://akinbrand.com.ng/mywi-fi/';

  const registerUser = async () => {
    try {
      const response = await axios.post(`${serverUrl}register.php`, {
        username,
        password,
      });

      // Display a success message
      Alert.alert('Registration Successful', response.data.message);

      // Clear the input fields
      setUsername('');
      setPassword('');

      // Navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      // Display an error message
      Alert.alert('Registration Error', 'An error occurred while registering. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        
        id="username"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
       
        id="password"
      />
      <Button title="Register" onPress={registerUser} />
      <Text style={styles.loginText}>Already Registered? </Text>
      <Button
        title="Login Instead"
        onPress={() => navigation.navigate('Login')}
        color="#007bff" // Change the button color to suit your design
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  loginText: {
    marginTop: 10,
    fontSize: 16,
  },
});