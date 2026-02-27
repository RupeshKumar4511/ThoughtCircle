import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['posts', 'my-posts'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://thoughtcircle.onrender.com/api/v1/posts' }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: '/',
                method: 'GET',
                credentials:"include",
            }),
            transformResponse: (posts) => posts.reverse(),
            providesTags: ['posts']
        }),
        getUserPosts: builder.query({
            query: () => ({
                url: '/my-posts',
                method: 'GET',
                credentials:"include",
            }),
            transformResponse: (posts) => posts.reverse(),
            providesTags: ['my-posts']
        }),
        createPost: builder.mutation({
            query: (post) => ({
                url: '/create-post',
                method: 'POST',
                credentials:"include",
                body: post,
                
            }),
            invalidatesTags: ['posts', 'my-posts']

        }),
        updateUserPost: builder.mutation({
            query: (data) => ({
                url: `/my-posts/${data[0]}`,
                method: 'PUT',
                credentials:"include",
                body: data[1]
            }),
            invalidatesTags: ['posts', 'my-posts']

        }),
        deleteUserPost: builder.mutation({
            query: (_id) => ({
                url: `/my-posts/${_id}`,
                credentials:"include",
                method: 'DELETE'
            }),
            invalidatesTags: ['posts', 'my-posts']

        }),
        postReaction: builder.mutation({
            query: ({ id, ...updatedPost }) => ({
                url: `/${id}`,
                method: 'PATCH',
                credentials:"include",
                body: updatedPost
            }),
            invalidatesTags: ['posts', 'my-posts'],
            async onQueryStarted({ id, ...updatedPost }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    api.util.updateQueryData("getPosts", undefined, (posts) => {
                        const postIndex = posts.findIndex(el => el._id === id)
                        if(updatedPost.reactions.like === true){
                            posts[postIndex].reactions.like=Number(updatedPost.reactions.like);
                        }else{
                            posts[postIndex].reactions.dislike=Number(updatedPost.reactions.dislike);
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


export const { useGetPostsQuery, useGetUserPostsQuery, useCreatePostMutation, useDeleteUserPostMutation, useUpdateUserPostMutation, usePostReactionMutation} = api;