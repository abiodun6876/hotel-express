import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const navigation = useNavigation();

  const serverUrl = 'https://akinbrand.com.ng/mywi-fi/';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${serverUrl}login.php`, {
        username,
        password,
      });

      if (response.data.message === 'Login Successful') {
        // Navigate to the Dashboard screen if the login is successful
        navigation.navigate('Welcome');

      } else {
        // Display an error message for unsuccessful login
        setModalVisible(true);
      }
    } catch (error) {
      // Display an error message for unsuccessful login
     // setModalVisible(true);
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={loginUser} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Login Error: Invalid username or password.</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Text style={styles.modalButton}>Navigate to Welcome Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
