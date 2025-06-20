import React from 'react';

import HomeScreenStack from './HomeScreenStack';
import QuizScreen from '../screens/QuizScreen';
// import DogInfoScreen from '../screens/DogInfoScreen';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#ff80ab"
      inactiveColor="#f8bbd0"
      barStyle={{backgroundColor: '#880e4f'}}>
      <Tab.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="dog" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          tabBarLabel: 'Quiz',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="paw" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
