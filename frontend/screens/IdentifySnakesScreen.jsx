import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IdentifySnakesScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
        setPrediction(null);
      }
    });
  };

  const handleCapturePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.error('Camera Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageUri(source.uri);
        setPrediction(null);
      }
    });
  };

  const handlePrediction = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please upload an image first');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'snake.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post('http://127.0.0.1:5000/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
        Alert.alert('Prediction Result', `Predicted class: ${response.data.prediction}`);
      } else {
        Alert.alert('Error', 'Prediction failed');
      }
    } catch (error) {
      console.error('Prediction Error: ', error);
      Alert.alert('Error', 'An error occurred while making the prediction');
    }
  };

  const handleRemoveImage = () => {
    setImageUri(null);
    setPrediction(null);
  };

  const handleLogResult = async () => {
    if (imageUri && prediction) {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please log in to save results');
        return;
      }
      navigation.navigate('LogSnake', { imageUri, prediction });
    } else {
      Alert.alert('Error', 'No image or prediction to log');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SerpentSleuth</Text>
        <Text style={styles.headerSubText}>A Project by Chamudi Abeysinghe</Text>
      </View>
      
      {!imageUri ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCapturePhoto}>
            <Image source={require('../assets/image.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Capture Snake Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
            <Image source={require('../assets/screenshot.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Upload Snake Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
            <Image source={require('../assets/return.png')} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          {prediction !== null && (
            <Text style={styles.predictionText}>Prediction: {prediction}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePrediction}>
              <Image source={require('../assets/predictive.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Make Prediction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRemoveImage}>
              <Image source={require('../assets/remove.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Remove Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogResult}>
              <Image source={require('../assets/log.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Log Result</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
              <Image source={require('../assets/return.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    fontFamily: 'Roboto',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '45%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
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
    marginVertical: 20,
  },
  predictionText: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default IdentifySnakesScreen;
