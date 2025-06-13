import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ImageSourcePropType} from 'react-native';

// Type for each dog's data
interface DogState {
  info: string;
  imgUrl?: ImageSourcePropType;
  isFavorite: boolean;
}

// Type for payload when adding a favorite
interface DogInfoPayload {
  name: string;
  info: string;
  imgUrl?: ImageSourcePropType;
}

// Redux state shape
interface FavoritesState {
  [dogName: string]: DogState;
}

// Initial state
const initialState: FavoritesState = {};

// Create the slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Sets dog info/image without affecting favorite status
    setDogData: (state, action: PayloadAction<DogInfoPayload>) => {
      const {name, info, imgUrl} = action.payload;
      state[name] = {
        ...state[name],
        info,
        imgUrl,
        isFavorite: state[name]?.isFavorite ?? false,
      };
    },

    // Toggles favorite status (creates entry if needed)
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      const current = state[name] ?? {
        info: '',
        imgUrl: undefined,
        isFavorite: false,
      };
      state[name] = {
        ...current,
        isFavorite: !current.isFavorite,
      };
    },

    // Adds a dog as favorite (info + image)
    addFavoriteDog: (state, action: PayloadAction<DogInfoPayload>) => {
      const {name, info, imgUrl} = action.payload;
      state[name] = {info, imgUrl, isFavorite: true};
    },

    // Removes a dog from favorites entirely
    removeFavoriteDog: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

// Export all actions
export const {setDogData, toggleFavorite, addFavoriteDog, removeFavoriteDog} =
  favoritesSlice.actions;

// Export reducer
export default favoritesSlice.reducer;
