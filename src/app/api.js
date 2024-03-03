import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Platform} from 'react-native';
import {getFromLocalStorage} from '../services/localStorage';
import {store} from './store';
export const MAIN_API_REDUCER_KEY = 'mainAPI';
const getTokenFromLocalStorage = async () => {
  return await getFromLocalStorage('token');
};

const getSettingFromLocalStorage = async () => {
  return await getFromLocalStorage('settings');
};

const prepareHeaders = async headers => {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Headers', '*');
  headers.set('Accept', 'application/json');

  const token = await getTokenFromLocalStorage();

  if (token) {
    console.log('getTokenFromLocalStorage', token);
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3300/'
      : 'http://localhost:3300/',
  prepareHeaders: prepareHeaders,
});

const baseQueryWithReauth = async (args, theApi, extraOptions) => {
  const result = await baseQuery(args, theApi, extraOptions);
  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  reducerPath: MAIN_API_REDUCER_KEY,
  tagTypes: ['Follows', 'Notification', 'Friends', 'Pushup'],
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
});

export default api;
