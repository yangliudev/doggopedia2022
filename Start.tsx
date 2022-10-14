import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';

const Start = () => {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
};

export default Start;
