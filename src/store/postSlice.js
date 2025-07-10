import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk('postList/fetch',async()=>{
    try{
         const response = await fetch('http://localhost:3000/posts');
        return response.json();
    }catch{
        throw new Error("error");
    }
})

export const createPost = createAsyncThunk('postList/create',async(postData)=>{
    const response = await fetch('http://localhost:3000/posts',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(postData)
    })
    return response.json()
})

const postSlice = createSlice({
    name:'postList',
    initialState:{
        isLoading:false,
        list : [],
        error:""
        
    },
    reducers:{
    },
    extraReducers:(builder=>{
        builder.addCase(fetchPost.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchPost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error = '';
            state.list = action.payload
        
        })
        .addCase(fetchPost.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload || "something went wrong.";

        })
        .addCase(createPost.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error = '';
            state.list.push(action.payload)
        })
        .addCase(createPost.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload || "something went wrong.";

        })
    })
   
})


export const postListActions = postSlice.actions;
export default postSlice;


