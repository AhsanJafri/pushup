import api from '../../../app/api';

export const notification = api.injectEndpoints({
  endpoints: builder => ({
    getUsersNotification: builder.query({
      query: params => ({
        url: `notifications/users-notification/${params.id}`,
      }),
      providesTags: ['Notification'],
    }),
    userNotifications: builder.mutation({
      query: body => ({
        url: 'notifications/users-notification',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notification'],
    }),
    sendPushChallenge: builder.mutation({
      query: body => ({
        url: 'notifications/notification/pushups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetUsersNotificationQuery,
  useUserNotificationsMutation,
  useSendPushChallengeMutation,
} = notification;
