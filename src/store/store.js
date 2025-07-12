import {configureStore} from '@reduxjs/toolkit';
import {api} from './apiSlice.js';
import authSlice from './authSlice.js';

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
})


export default store;