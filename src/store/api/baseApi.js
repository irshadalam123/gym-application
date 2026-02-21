import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for your API – update when you have a real backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token from state if you have one (e.g. from authSlice)
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Member', 'Members', 'Program', 'Programs', 'Trainer', 'Trainers', 'Schedule'],
  endpoints: () => ({}),
});
