import {createSlice} from '@reduxjs/toolkit';

export const dataInfoSlice = createSlice({
  name: 'dataInfo',

  initialState: {
    wikiTextResponse: [],
  },

  reducers: {
    saveWikiTextResponse: (state, action) => {
      return {
        ...state,
        wikiTextResponse: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveWikiTextResponse} = dataInfoSlice.actions;

export default dataInfoSlice.reducer;
