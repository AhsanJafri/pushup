import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  testModeEnabled: false,
  server: 'productionServer',
  simulateStripReader: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveSettings: (state, action) => {
      console.log(action);
      if (action.payload) {
        state.testModeEnabled = action.payload.testModeEnabled;
        state.server = action.payload.server;
        state.simulateStripReader = action.payload.simulateStripReader;
      }
    },
  },
  extraReducers: builder => {},
});

export const {saveSettings} = settingsSlice.actions;

export default settingsSlice.reducer;
