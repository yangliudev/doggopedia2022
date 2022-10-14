import {createSlice} from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    i_account: '',
    i_customer: '',

    account_info: [],
    customer_info: [],

    isLoggedIn: false,
  },
  reducers: {
    saveAccountInfo: (state, action) => {
      return {
        ...state,
        account_info: action.payload,
      };
    },
    saveCustomerInfo: (state, action) => {
      return {
        ...state,
        customer_info: action.payload,
      };
    },
    loginUser: state => {
      return {
        ...state,
        isLoggedIn: true,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveAccountInfo, saveCustomerInfo, loginUser} =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
