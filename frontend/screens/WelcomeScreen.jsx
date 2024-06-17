import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('/Users/chamudi/Desktop/final_year_project/SerpentSleuth/frontend/assets/snake_logo.jpeg')} style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 10, 
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;







// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// const WelcomeScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* <Image source={require('./assets/snake_logo.png')} style={styles.logo} /> */}
//       <Text style={styles.title}>Welcome to SerpentSleuth</Text>
//       <Text style={styles.subtitle}>Identify Snakes Easily with Image Upload</Text>
//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={() => navigation.navigate('SignUp')}
//       >
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4CAF50',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
// });

// export default WelcomeScreen;
