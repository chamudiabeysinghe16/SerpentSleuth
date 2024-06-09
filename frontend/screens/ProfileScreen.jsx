import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5001/api/auth/user', {
            headers: {
              'x-auth-token': token,
            },
          });
          setUser(response.data);
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error(error);
        navigation.navigate('Login');
      }
    };

    fetchUser();
  }, [navigation]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/woman.png')} 
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Username:</Text>
        <Text style={styles.infoValue}>{user.username}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
    fontFamily: 'Roboto',
  },
  infoValue: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'Roboto',
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

export default ProfileScreen;
