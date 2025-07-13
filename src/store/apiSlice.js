import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['post', 'user-post'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: (posts) => posts.reverse(),
            providesTags: ['post']
        }),
        getUserPosts: builder.query({
            query: () => '/posts',
            transformResponse: (posts) => posts.reverse(),
            providesTags: ['user-post']
        }),
        createPost: builder.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['post', 'user-post']

        }),
        updateUserPost: builder.mutation({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['post', 'user-post']

        }),
        deleteUserPost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['post', 'user-post']

        }),
    })
})


export const { useGetPostsQuery, useGetUserPostsQuery, useCreatePostMutation, useDeleteUserPostMutation, useUpdateUserPostMutation } = api;