import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: {
    _id: 0,
  },
  isAuthenticated: false,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userLogout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {},
});

export const {userLogin, userLogout} = authenticationSlice.actions;

export const usersSelector = state => state.authentication.user;
export const usersIsAuthenticated = state => state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
