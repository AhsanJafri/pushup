import api from '../../../app/api';

export const login = api.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query: body => ({
        url: 'auth/create-user',
        method: 'POST',
        body,
      }),
    }),
    createUserGoogle: builder.mutation({
      query: body => ({
        url: 'auth/create-user-google',
        method: 'POST',
        body,
      }),
    }),
    getCurrentUser: builder.mutation({
      query: body => ({
        url: 'auth/get-user',
        method: 'POST',
        body,
      }),
    }),
    updateCurrentUser: builder.mutation({
      query: body => ({
        url: 'auth/update-user',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useCreateUserGoogleMutation,
  useGetCurrentUserMutation,
  useUpdateCurrentUserMutation,
} = login;
