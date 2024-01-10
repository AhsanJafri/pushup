import api from "../../../app/api";
import {
  convertObjectToQueryString,
  convertBooleansToNumbers,
} from "../helper/functions";

export const appsFilters = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppsAllTechnology: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-technologies?${queryString}`;
      },
      providesTags: ['Technologies'],
    }),
    getAppsContentRating: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-content-rating?${queryString}`;
      },
      providesTags: ['ContentRating'],
    }),
    getAppsMonthlyVisitors: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-monthly-active-users?${queryString}`;
      },
      providesTags: ['MonthlyVisitors'],
    }),
    getAppsAverageRating: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-average-rating?${queryString}`;
      },
      providesTags: ['AverageRating'],
    }),
    getAppsInstalls: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-installs?${queryString}`;
      },
      providesTags: ['Installs'],
    }),
    getAppsCategories: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-categories?${queryString}`;
      },
      providesTags: ['Categories'],
    }),
    getAppsCountries: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-countries?${queryString}`;
      },
      providesTags: ['Countries'],
    }),
    getAppsPermissions: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-permissions?${queryString}`;
      },
      providesTags: ['Permissions'],
    }),
    getAppsPrivacyData: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-privacy-data?${queryString}`;
      },
      providesTags: ['PrivacyData'],
    }),
    getAppsAppSearch: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-app-search?${queryString}`;
      },
      providesTags: ['AppSearch'],
    }),
    getAppsPublisherSearch: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-publisher-search?${queryString}`;
      },
      providesTags: ['PublisherSearch'],
    }),
    getAppsBundleIdSearch: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-bundleid-search?${queryString}`;
      },
      providesTags: ['BundleIdSearch'],
    }),
    getAppsFilterColumns: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-filter-columns?${queryString}`;
      },
      providesTags: ['AppTableColumns'],
    }),
    setAppsTableColumns: builder.mutation({
      query: (body) => ({
        url: `/apps/filters/update-user-column-fields`,
        method: 'POST',
        body: convertBooleansToNumbers(body),
      }),
      invalidatesTags: ['AppTableColumns'],
    }),
    getAppsRecords: builder.mutation({
      query: (body) => ({
        url: `/apps/data/get-apps`,
        method: 'POST',
        body: convertBooleansToNumbers(body),
      }),
      invalidatesTags: ['getAppsRecords'],
    }),
    getAppsExportColumns: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-export-columns?${queryString}`;
      },
    }),
    appsExport: builder.mutation({
      query: (body) => ({
        url: `apps/exports/export-companies`,
        method: 'POST',
        body: convertBooleansToNumbers(body),
      }),
    }),
    getAppsFramworks: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/filters/get-frameworks?${queryString}`;
      },
    }),
    getAppsTechnologyById: builder.query({
      query: (params) => {
        const queryParams = { ...params };
        const queryString = convertObjectToQueryString(queryParams);
        return `/apps/data/get-technology-by-id?${queryString}`;
      },
    }),
  }),
});

export const {
  useGetAppsAppSearchQuery,
  useGetAppsMonthlyVisitorsQuery,
  useGetAppsAverageRatingQuery,
  useGetAppsAllTechnologyQuery,
  useGetAppsBundleIdSearchQuery,
  useGetAppsCategoriesQuery,
  useGetAppsContentRatingQuery,
  useGetAppsCountriesQuery,
  useGetAppsInstallsQuery,
  useGetAppsPermissionsQuery,
  useGetAppsPrivacyDataQuery,
  useGetAppsPublisherSearchQuery,
  useGetAppsFilterColumnsQuery,
  useSetAppsTableColumnsMutation,
  useGetAppsRecordsMutation,
  useGetAppsExportColumnsQuery,
  useAppsExportMutation,
  useGetAppsFramworksQuery,
  useGetAppsTechnologyByIdQuery,
} = appsFilters;
