import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function BookingScreen({ route }) {
  const { hotel } = route.params;
  const [formData, setFormData] = useState({
    hotel_id: hotel.id,
    check_in_date: '', // Initialize with an empty string
    check_out_date: '', // Initialize with an empty string
    num_guests: '',
    phone_number: '',
    address: '',
    email: '',
    num_men: '',
    num_women: '',
    num_children: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (key, text) => {
    setFormData({ ...formData, [key]: text });
  };

  const handleBooking = async () => {
    try {
      const serverUrl = 'https://akinbrand.com.ng/mywi-fi/'; // Update with your server endpoint
      const response = await axios.post(`${serverUrl}booking.php`, formData);

      if (response.data.message === 'Booking Successful') {
        setModalMessage('Your booking has been confirmed.');
      } else {
        setModalMessage('An error occurred while booking. Please try again.');
      }

      setModalVisible(true);
    } catch (error) {
      setModalMessage('An error occurred while booking. Please try again.');
      console.error(error);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View >
      <Text style={styles.header}>Make a Booking</Text>
      <Text style={styles.hotelName}>{hotel.name}</Text>

      <View >
       
        <TextInput  style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={(text) => handleInputChange('check_in_date', text)}
          value={formData.check_in_date}
          id='check_in_date'
        />
      </View>

      <View>
        
        <TextInput  style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={(text) => handleInputChange('check_out_date', text)}
          value={formData.check_out_date}
          id='check_out_date'
        />
      </View>

      <View >
        
        <TextInput  style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => handleInputChange('phone_number', text)}
          value={formData.phone_number}
          id='phone_number'
        />
      </View>

      <View >
      
        <TextInput  style={styles.input}
          placeholder="Number of Men"
          onChangeText={(text) => handleInputChange('num_men', text)}
          value={formData.num_men}
          keyboardType="numeric"
          id='num_men'
        />
      </View>

      <View >
       
        <TextInput  style={styles.input}
          placeholder="Number of Women"
          onChangeText={(text) => handleInputChange('num_women', text)}
          value={formData.num_women}
          keyboardType="numeric"
          id='um_women'
        />
      </View>

      <View >
        
        <TextInput  style={styles.input}
          placeholder="Number of Children"
          onChangeText={(text) => handleInputChange('num_children', text)}
          value={formData.num_children}
          keyboardType="numeric"
          id='num_children'
        />
      </View>

      <View >
        
        <TextInput  style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleInputChange('email', text)}
          value={formData.email}
          id='email'
        />
      </View>

      <View >
        
        <TextInput  style={styles.input}
          placeholder="Address"
          onChangeText={(text) => handleInputChange('address', text)}
          value={formData.address}
          id='address'
        />
      </View>

      <Button title="Book Now" onPress={handleBooking} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{modalMessage}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalButton}>OK</Text>
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
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  datePicker: {
    width: '80%',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'blue',
  },
});
