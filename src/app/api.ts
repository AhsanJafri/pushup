import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const MAIN_API_REDUCER_KEY = 'mainAPI';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_ENDPOINT}`,
  prepareHeaders: headers => {
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Accept', 'application/json');

    return headers;
  },
});

const baseQueryWithReauth = async (args, theApi, extraOptions) => {
  const result = await baseQuery(args, theApi, extraOptions);

  // if (result.meta.response.status === 401) {
  //   theApi.dispatch(logoutUser());
  // }

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
