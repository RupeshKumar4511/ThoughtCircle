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
        credentials:"include",
        body:JSON.stringify(userData)
    })
    return response.json()
})

export const signOut = createAsyncThunk('auth/signOut',async(userData)=>{
    const response = await fetch('http://localhost:5000/sign-out',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        credentials:"include",
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


const persistedUser = localStorage.getItem("user");
const parsedUser = persistedUser ? JSON.parse(persistedUser) : {};

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoading:false,
        response : {},// for signup
        sendEmailResponse : {},
        verifyEmailResponse:{},
        resetPasswordResponse:{},
        authResponse:parsedUser,
        error:{
            signUpError : "",
            authError: "",
            logoutError:"",
            sendMailError: "",
            verifyEmailError:"",
            resetPasswordError: "",
        }
        
    },
    reducers:{
    },
    extraReducers:(builder=>{
        builder.addCase(signUp.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error.signUpError = '';
            state.response = action.payload
        
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.isLoading = false;
            state.error.signUpError = action.error.message || "something went wrong.";

        })
        .addCase(signIn.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signIn.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error.authError = '';
            state.authResponse = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
            
            console.log(action.payload)
        })
        .addCase(signIn.rejected,(state,action)=>{
            state.isLoading = false;
            state.error.authError = action.payload || "something went wrong.";

        })
        .addCase(signOut.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signOut.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error.logoutError = '';
            state.authResponse = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
            
        })
        .addCase(signOut.rejected,(state,action)=>{
            state.isLoading = false;
            state.error.logoutError = action.payload || "something went wrong.";

        })
        .addCase(sendMail.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(sendMail.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error.sendMailError = '';
            state.sendEmailResponse = action.payload

        })
        .addCase(sendMail.rejected,(state,action)=>{
            state.isLoading = false;
            state.error.sendMailError = action.payload || "something went wrong.";

        })
        .addCase(verifyEmail.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(verifyEmail.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error.verifyEmailError = '';
            state.verifyEmailResponse = action.payload
        })
        .addCase(verifyEmail.rejected,(state,action)=>{
            state.isLoading = false;
            state.error.verifyEmailError = action.payload || "something went wrong.";

        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.error.resetPasswordError = '';
            state.resetPasswordResponse = action.payload
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading = false;
            state.error.resetPasswordError = action.payload || "something went wrong.";

        })
    })
   
})


export const authActions = authSlice.actions;
export default authSlice;


