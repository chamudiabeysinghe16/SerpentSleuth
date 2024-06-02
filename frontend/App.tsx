import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';  // Ensure you create this screen

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome"  
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Hide header for Welcome screen
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default App;
