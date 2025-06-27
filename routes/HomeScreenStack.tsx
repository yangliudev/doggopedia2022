import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import DogInfoScreen from '../screens/DogInfoScreen';
import QuizScreen from '../screens/QuizScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DogInfoScreen" component={DogInfoScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
