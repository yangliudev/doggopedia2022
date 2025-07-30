import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DataInfoState {
  wikiTextResponse: string[];
}

const initialState: DataInfoState = {
  wikiTextResponse: [],
};

export const dataInfoSlice = createSlice({
  name: 'dataInfo',
  initialState,
  reducers: {
    saveWikiTextResponse: (state, action: PayloadAction<string[]>) => {
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
