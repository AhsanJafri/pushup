import api from '../../../app/api';

export const users = api.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: params => ({
        url: `auth/get-all-users/${params.id}`,
      }),
      providesTags: ['Follows'],
    }),
    getAllFriendList: builder.query({
      query: params => ({
        url: `auth/get-friends/${params.id}`,
      }),
      providesTags: ['Friends'],
    }),
    getCurrentUserPushUp: builder.query({
      query: params => ({
        url: `auth/get-users-pushup/${params.id}`,
      }),
      providesTags: ['Pushup'],
    }),
    updateUserPushUp: builder.mutation({
      query: body => ({
        url: 'auth/update-pushup',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Pushup'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllFriendListQuery,
  useGetCurrentUserPushUpQuery,
  useUpdateUserPushUpMutation,
} = users;
