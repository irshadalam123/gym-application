import { baseApi } from "../../store/api/baseApi";
import url from "./endpoint";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: url.login.endpoint,
        method: url.login.method,
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: url.register.endpoint,
        method: url.register.method,
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
