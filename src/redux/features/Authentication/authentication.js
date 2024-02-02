import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  isImpersonating: false,
  isTour: false,
  isFirstTime: 1,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    emptyError: state => {
      state.error = null;
    },
    saveToken: (state, action) => {
      if (action.payload) {
        console.log(action);
        state.token = action.payload;
      }
    },
    clearToken: (state, action) => {
      console.log('clearToken');
      state.token = null;
    },
    updateUserFirstLogin: state => {
      if (state.user) {
        state.user.first_login = 0;
      }
    },
    updateTourFirstTime: state => {
      state.isFirstTime = 0;
    },
    logoutUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.isImpersonating = false;
    },
    startTour: state => {
      state.isTour = true;
    },
    endTour: state => {
      state.isTour = false;
    },
  },
  extraReducers: builder => {},
});

export const {
  loginUser,
  logoutUser,
  emptyError,
  startTour,
  endTour,
  updateUserFirstLogin,
  updateTourFirstTime,
  saveToken,
  clearToken,
} = authenticationSlice.actions;

export const usersSelector = state => state.authentication.user;
export const usersIsAuthenticated = state =>
  state.authentication.isAuthenticated;
export const userFirstTimeTour = state => state.authentication.isFirstTime;
export const usersToken = state => state.authentication.token;
export const userImpersonating = state => state.authentication.isImpersonating;
export const errorMessage = state => state.authentication.error;

export default authenticationSlice.reducer;
