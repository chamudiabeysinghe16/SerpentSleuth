import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5001/api/auth/user', {
            headers: { 'x-auth-token': token },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
          navigation.navigate('Login');
        }
      } else {
        setIsGuest(true);
        Alert.alert('Guest User', 'Please sign up to view your profile', [
          { text: 'OK', onPress: () => navigation.navigate('SignUp') }
        ]);
      }
    };

    fetchUser();
  }, [navigation]);

  if (isGuest) {
    return (
      <View style={styles.container}>
        <Text style={styles.guestText}>Guest users cannot access profiles.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/woman.png')} style={styles.profileImage} />
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
  guestText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
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
