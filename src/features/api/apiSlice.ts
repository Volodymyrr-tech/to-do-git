import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const AUTH_TOKEN = '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'

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
    prepareHeaders: (headers) => {
      headers.set('authorization', AUTH_TOKEN)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getStars: builder.query({
      query: ({ owner, repo }) => `/repos/${owner}/${repo}`,
    }),
    getIssues: builder.query({
      query: ({ owner, repo }) => `/repos/${owner}/${repo}/issues?per_page=5`,
    }),
    getOpenAssignee: builder.query({
      query: ({ owner, repo }) =>
        `/repos/${owner}/${repo}/issues?state=open&assignee=*&per_page=5`,
    }),
    getClosedIssues: builder.query({
      query: ({ owner, repo }) =>
        `/repos/${owner}/${repo}/issues?state=closed&per_page=5`,
    }),
  }),
})

export const {
  useGetStarsQuery,
  useGetIssuesQuery,
  useGetOpenAssigneeQuery,
  useGetClosedIssuesQuery,
} = api

export default api
