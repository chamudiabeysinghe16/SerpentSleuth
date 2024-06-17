import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const buttonWidth = (width / 2) - 20;
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const checkGuest = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setIsGuest(true);
      }
    };

    checkGuest();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    Alert.alert('Logged Out', 'You have been logged out.');
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to SerpentSleuth</Text>
        <Text style={styles.headerSubText}>A Project by Chamudi Abeysinghe</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={() => navigation.navigate('IdentifySnakes')}>
          <Image source={require('../assets/snake.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Identify Snakes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={() => navigation.navigate('SnakesInfo')}>
          <Image source={require('../assets/history.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Snakes Info</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={() => navigation.navigate('Blog')}>
          <Image source={require('../assets/blog.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={() => {
          if (isGuest) {
            Alert.alert('Guest User', 'Please sign up to view your profile', [
              { text: 'OK', onPress: () => navigation.navigate('SignUp') }
            ]);
          } else {
            navigation.navigate('Profile');
          }
        }}>
          <Image source={require('../assets/user.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>
      {isGuest ? (
        <TouchableOpacity style={styles.fullWidthButton} onPress={() => navigation.navigate('SignUp')}>
          <Image source={require('../assets/log-out.png')} style={styles.buttonImage} />
          <Text style={styles.fullWidthButtonText}>Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.fullWidthButton} onPress={handleLogout}>
          <Image source={require('../assets/log-out.png')} style={styles.buttonImage} />
          <Text style={styles.fullWidthButtonText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    backgroundColor: '#4CAF50',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop:100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 30,
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
  welcomeText: {
    color: '#4CAF50',
    fontSize: 28,
    fontFamily: 'Roboto',
  },
  welcomeTextBold: {
    color: '#4CAF50',
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    padding: 50,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  fullWidthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fullWidthButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default MenuScreen;
