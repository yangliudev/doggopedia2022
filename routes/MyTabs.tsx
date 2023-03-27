import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import DogInfoScreen from '../screens/DogInfoScreen';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="dog" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="DogInfo" component={DogInfoScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
