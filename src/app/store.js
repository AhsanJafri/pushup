import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {setupListeners} from '@reduxjs/toolkit/query';
import {rtkQueryErrorLogger} from './middlewares/rtkQueryErrorLogger';
import authenticationReducer from '../redux/features/Authentication/authentication';
import settingsReducer from '../redux/features/App/settings';
import api, {MAIN_API_REDUCER_KEY} from './api';

const reducers = {
  [MAIN_API_REDUCER_KEY]: api.reducer,
  authentication: authenticationReducer,
  settings: settingsReducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const clearCachedGetQueries = () => {
  api.util.resetApiState();
};

const combinedReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const rootReducer = (state, action) => persistedReducer(state, action);

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      api.middleware,
      rtkQueryErrorLogger,
    ]),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
