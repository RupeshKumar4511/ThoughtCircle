import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    endpoints:(builder)=>({
        getPosts: builder.query({
            query:()=>'/posts',
            transformResponse:(posts)=>posts.reverse()
        })
    })
})


export const {useGetPostsQuery} = api;