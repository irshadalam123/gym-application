import { baseApi } from "../../store/api/baseApi";
import url from "./endpoint";

/**
 * Example RTK Query API for members.
 * Extend baseApi with injectEndpoints and add your real endpoints when you have a backend.
 */
export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: (params) => ({
        url: url.getMembers.endpoint,
        method: url.getMembers.method,
        params,
      })
    }),
    getMemberById: builder.query({
      query: (id) => ({
        url: `${url.getMemberById.endpoint}/${id}`,
        method: url.getMemberById.method,
      })
    }),
    createMember: builder.mutation({
      query: (body) => ({
        url: url.createMember.endpoint,
        method: url.createMember.method,
        body,
      })
    }),
    updateMember: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${url.updateMember.endpoint}/${id}`,
        method: url.updateMember.method,
        body,
      })
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `${url.deleteMember.endpoint}/${id}`,
        method: url.deleteMember.method,
      })
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberByIdQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = membersApi;
