import api from '../../../app/api';

export const follow = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation({
      query: body => ({
        url: 'follows/add-user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Follows'],
    }),
  }),
});

export const {useFollowUserMutation} = follow;
