import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getFromLocalStorage} from '../services/localStorage';
import {store} from './store';
import { PRODUCTION, DEVELOPMENT, TESTING } from '../services/constant';
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
  console.log(token);

  if (token) {
    console.log('getTokenFromLocalStorage', token);
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `https://app.booktix.com/api/v1/admin`,
  prepareHeaders: prepareHeaders,
});


const baseQueryWithReauth = async (args, theApi, extraOptions) => {
  let baseUrl =  PRODUCTION ;

  const settings = await getSettingFromLocalStorage();
   
  if(settings){
  const parsedSettings = JSON.parse(settings);
  if (parsedSettings && parsedSettings.server) {
    const server = parsedSettings.server;
    if (server === 'developmentServer') {
      baseUrl = DEVELOPMENT ;
    } else if (server === 'testServer') {
      baseUrl = TESTING  ;
    } 
  }
  }

  
  let adjustedArgs  = {...args, url: baseUrl + args.url}
 
  if(typeof args === 'string'){
      adjustedArgs = baseUrl + args;
  }
 
  const result = await baseQuery(adjustedArgs, theApi, extraOptions);
  return result;
};

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  reducerPath: MAIN_API_REDUCER_KEY,
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
});

export default api;