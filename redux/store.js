import {configureStore} from '@reduxjs/toolkit';
import userInfoReducer from './slices/userInfoSlice';

const reducer = {
  userInfo: userInfoReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
