import api from '../../../app/api';

export const login = api.injectEndpoints({
  endpoints: builder => ({
    loginForm: builder.mutation({
      query: body => ({
        url: '/token',
        method: 'POST',
        body,
        responseHandler: response => response.text(),
      }),
    }),
    loginGoogle: builder.mutation({
      query: body => ({
        url: '/user/auth/google/callback',
        method: 'POST',
        body: {email: body.profileObj.email, google_id: body.googleId},
      }),
    }),
    register: builder.mutation({
      query: body => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginFormMutation,
  useLoginGoogleMutation,
  useRegisterMutation,
} = login;
