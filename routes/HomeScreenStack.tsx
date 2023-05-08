import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import DogInfoScreen from '../screens/DogInfoScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DogInfoScreen" component={DogInfoScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
