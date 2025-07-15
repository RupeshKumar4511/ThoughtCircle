import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk('auth/signup',async(userData,thunkAPI)=>{
    try{
        const response = await fetch('http://localhost:5000/signup',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(userData)
    })
    return response.json()
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const signIn = createAsyncThunk('auth/signin',async(userData)=>{
    const response = await fetch('http://localhost:5000/signin',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(userData)
    })
    return response.json()
})

export const sendMail = createAsyncThunk('auth/sendMail',async(userData)=>{
    const response = await fetch('http://localhost:5000/send-email',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(userData)
    })
    return response.json()
})

export const verifyEmail = createAsyncThunk('auth/verifyEmail',async(userData)=>{
    const response = await fetch('http://localhost:5000/verify-email',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(userData)
    })
    return response.json()
})

export const resetPassword = createAsyncThunk('auth/reset-password',async(userData)=>{
    const response = await fetch('http://localhost:5000/reset-password',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(userData)
    })
    return response.json()
})

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoading:false,
        response : {},
        authResponse:{},
        error:""
        
    },
    reducers:{
    },
    extraReducers:(builder=>{
        builder.addCase(signUp.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error = '';
            state.response = action.payload
        
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message || "something went wrong.";

        })
        .addCase(signIn.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signIn.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error = '';
            state.authResponse = action.payload
        })
        .addCase(signIn.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload || "something went wrong.";

        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error = '';
            state.response = action.payload
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload || "something went wrong.";

        })
    })
   
})


export const authActions = authSlice.actions;
export default authSlice;


