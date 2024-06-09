import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/ProfileScreen';
import IdentifySnakesScreen from './screens/IdentifySnakesScreen';
import LogSnakeScreen from './screens/LogSnakeScreen';
import SnakesInfoScreen from './screens/SnakesInfoScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="IdentifySnakes" component={IdentifySnakesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LogSnake" component={LogSnakeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SnakesInfo" component={SnakesInfoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
