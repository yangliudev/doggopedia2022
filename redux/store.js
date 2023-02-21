import {configureStore} from '@reduxjs/toolkit';
import dataInfoReducer from './slices/dataInfoSlice';

const reducer = {
  dataInfo: dataInfoReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
