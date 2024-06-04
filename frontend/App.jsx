import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* Add placeholder screens */}
        {/* <Stack.Screen name="IdentifySnakes" component={() => <Text>Identify Snakes Screen</Text>} />
        <Stack.Screen name="SnakesInfo" component={() => <Text>Snakes Info Screen</Text>} />
        <Stack.Screen name="Blog" component={() => <Text>Blog Screen</Text>} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
