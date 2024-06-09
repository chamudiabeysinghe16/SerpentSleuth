import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Menu');
      }
    } catch (error) {
      Alert.alert('Error', error.response.data.msg || 'Invalid credentials');
    }
  };

  const handleGuestLogin = () => {
    // Add your guest login logic here
    Alert.alert('Guest Login', 'Logged in as guest');
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/account.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.guestButton]} onPress={handleGuestLogin}>
        <Text style={styles.buttonText}>Login as Guest</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.loginText}>Don't have an account? <Text style={styles.loginTextBold}>Sign Up</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Forgot password functionality coming soon!')}>
          <Text style={styles.footerText}>Forgot Password?</Text>
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
    backgroundColor: '#E8F5E9',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: '#8BC34A',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  loginText: {
    color: '#333',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto',
  },
  loginTextBold: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#4CAF50',
    fontFamily: 'Roboto',
    marginVertical: 5,
  },
});

export default LoginScreen;
