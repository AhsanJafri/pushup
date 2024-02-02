import api from '../../../app/api';

export const mainAppApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrganization: builder.mutation({
      query: () => ({
        url: '/organizations',
      method: 'GET',
      responseHandler: response => { const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return response.text();
      }}})
    }),
    getDepartments: builder.mutation({
      query: params => {
        return `/organization/${params}/departments`;
      },
    }),
  }),
});

export const {useGetOrganizationMutation, useGetDepartmentsMutation} = mainAppApi;
