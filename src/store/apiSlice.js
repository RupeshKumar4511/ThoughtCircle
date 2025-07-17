import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['post', 'user-post'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/user' }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: '/posts',
                method: 'GET',
                credentials:"include",
            }),
            transformResponse: (posts) => posts.reverse(),
            providesTags: ['post']
        }),
        getUserPosts: builder.query({
            query: () => ({
                url: '/user-posts',
                method: 'GET',
                credentials:"include",
            }),
            transformResponse: (posts) => posts.reverse(),
            providesTags: ['user-post']
        }),
        createPost: builder.mutation({
            query: (post) => ({
                url: '/create-post',
                method: 'POST',
                credentials:"include",
                body: post,
                
            }),
            invalidatesTags: ['post', 'user-post']

        }),
        updateUserPost: builder.mutation({
            query: ({ _id, ...updatedPost }) => ({
                url: `/user-posts/${_id}`,
                method: 'PUT',
                credentials:"include",
                body: updatedPost
            }),
            invalidatesTags: ['post', 'user-post']

        }),
        deleteUserPost: builder.mutation({
            query: (_id) => ({
                url: `/user-posts/${_id}`,
                credentials:"include",
                method: 'DELETE'
            }),
            invalidatesTags: ['post', 'user-post']

        }),
        postReaction: builder.mutation({
            query: ({ id, ...updatedPost }) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                credentials:"include",
                body: updatedPost
            }),
            invalidatesTags: ['post', 'user-post'],
            async onQueryStarted({ id, ...updatedPost }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    api.util.updateQueryData("getPosts", undefined, (posts) => {
                        const postIndex = posts.findIndex(el => el._id === id)
                        if(updatedPost.reactions.like === true){
                            posts[postIndex].reactions.like+=1;
                        }else{
                            posts[postIndex].reactions.dislike+=1;
                        }
                        return posts;
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            }

        }),
    })
})


export const { useGetPostsQuery, useGetUserPostsQuery, useCreatePostMutation, useDeleteUserPostMutation, useUpdateUserPostMutation, usePostReactionMutation } = api;