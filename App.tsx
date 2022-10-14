import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';

import store from './redux/store';
import Start from './Start';

const App = () => {
  return (
    <Provider store={store}>
      <Start />
    </Provider>
  );
};

export default App;
