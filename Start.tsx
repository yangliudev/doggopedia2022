import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Drawer from './routes/Drawer';

const Start = () => {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
};

export default Start;
