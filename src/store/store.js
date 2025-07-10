import {configureStore} from '@reduxjs/toolkit';
import {api} from './apiSlice.js';
import postSlice from './postSlice.js';

const store = configureStore({
    reducer:{
        postList:postSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
})


export default store;