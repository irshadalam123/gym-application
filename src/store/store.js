import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from './slices/authSlice';
// membersApi and authApi inject into baseApi, so only baseApi goes in the store
import '../services/members';
import '../services/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
