import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MyTabs from './routes/MyTabs';
import ErrorBoundary from './components/ErrorBoundary';

const Start = () => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default Start;
