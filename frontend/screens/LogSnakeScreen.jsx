import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogSnakeScreen = ({ route, navigation }) => {
  const { imageUri, prediction } = route.params;
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5001/api/auth/user', {
          method: 'GET',
          headers: { 'x-auth-token': token },
        });
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Fetch Username Error: ', error);
        Alert.alert('Error', 'Failed to fetch username');
      }
    };

    fetchUsername();
  }, []);

  const handleSaveLog = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:5001/api/snake-logs/save-log', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-auth-token': token 
        },
        body: JSON.stringify({ imageUrl: imageUri, prediction, username }), 
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Log saved successfully');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Error', 'Failed to save log');
      }
    } catch (error) {
      console.error('Save Log Error: ', error);
      Alert.alert('Error', 'An error occurred while saving the log');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SerpentSleuth</Text>
        <Text style={styles.headerSubText}>A Project by Chamudi Abeysinghe</Text>
      </View>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.text}>User: {username}</Text>
      <Text style={styles.text}>Prediction: {prediction}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveLog}>
          <Image source={require('../assets/time.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Save Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IdentifySnakes')}>
        <Image source={require('../assets/return.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f0f4f7' 
  },
  header: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  headerSubText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  title: { 
    fontSize: 34, 
    fontWeight: '700', 
    color: '#4CAF50', 
    marginBottom: 20, 
    fontFamily: 'Roboto' 
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  image: { 
    width: 300, 
    height: 300, 
    borderRadius: 8, 
    marginVertical: 20 
  },
  text: { 
    fontSize: 18, 
    color: '#333', 
    marginVertical: 10 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%', 
    marginTop: 20 
  },
  button: { 
    width: '45%', 
    padding: 15, 
    marginVertical: 10, 
    borderRadius: 8, 
    backgroundColor: '#4CAF50', 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold', 
    fontFamily: 'Roboto', 
    textAlign: 'center' 
  },
});

export default LogSnakeScreen;
