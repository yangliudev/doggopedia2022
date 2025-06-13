import {configureStore} from '@reduxjs/toolkit';
import dataInfoReducer from './slices/dataInfoSlice';
import favoritesReducer from './slices/favoritesSlice';

const reducer = {
  dataInfo: dataInfoReducer,
  favorites: favoritesReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
