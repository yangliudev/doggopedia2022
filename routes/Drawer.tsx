import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
