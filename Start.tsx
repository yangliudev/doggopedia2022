import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MyTabs from './routes/MyTabs';

const Start = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default Start;
