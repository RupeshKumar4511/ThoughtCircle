import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        const response = await fetch('https://thoughtcircle.onrender.com/signup', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "signup failed");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const signIn = createAsyncThunk('auth/signin', async (userData,thunkAPI) => {
    try {
        const response = await fetch('https://thoughtcircle.onrender.com/signin', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "login failed");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const signOut = createAsyncThunk('auth/signOut', async (userData,thunkAPI) => {
    try {
        const response = await fetch('https://thoughtcircle.onrender.com/sign-out', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            credentials: "include",
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "sign-out failed");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const sendMail = createAsyncThunk('auth/sendMail', async (userData,thunkAPI) => {
    try {
        const response = await fetch('https://thoughtcircle.onrender.com/send-email', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to send email");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (userData,thunkAPI) => {
    try {
        const response = await fetch('https://thoughtcircle.onrender.com/verify-email', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to verify-email");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const resetPassword = createAsyncThunk('auth/reset-password', async (userData,thunkAPI) => {
    try {
        const response = await fetch('https://thoughtcircle.onrender.com/reset-password', {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "failed to reset password");
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})


const persistedUser = localStorage.getItem("user");
const parsedUser = persistedUser ? JSON.parse(persistedUser) : {};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        response: {},// for signup
        sendEmailResponse: {},
        verifyEmailResponse: {},
        resetPasswordResponse: {},
        authResponse: parsedUser,
        tempAuthResponse: {},
        error: {
            signUpError: "",
            authError: "",
            logoutError: "",
            sendMailError: "",
            verifyEmailError: "",
            resetPasswordError: "",
        }

    },
    reducers: {
        updateSendMailResponse:(state)=>{
            state.sendEmailResponse="";
            state.error.sendMailError="";
        }
    },
    extraReducers: (builder => {
        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.signUpError = '';
                state.response = action.payload

            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error.signUpError = action.payload || action.error.message || "Something went wrong.";

            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.authError = '';
                state.authResponse = action.payload
                localStorage.setItem("user", JSON.stringify(action.payload))
                state.tempAuthResponse = action.payload


            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error.authError = action.payload || action.error.message || "Something went wrong.";

            })
            .addCase(signOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.logoutError = '';
                state.authResponse = action.payload
                localStorage.setItem("user", JSON.stringify(action.payload))

            })
            .addCase(signOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error.logoutError = action.payload || action.error.message || "Something went wrong.";
            })
            .addCase(sendMail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.sendMailError = '';
                state.sendEmailResponse = action.payload

            })
            .addCase(sendMail.rejected, (state, action) => {
                state.isLoading = false;
                state.error.sendMailError = action.payload || action.error.message || "Something went wrong.";

            })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.verifyEmailError = '';
                state.verifyEmailResponse = action.payload
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error.verifyEmailError = action.payload || action.error.message || "Something went wrong.";

            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.resetPasswordError = '';
                state.resetPasswordResponse = action.payload
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error.resetPasswordError = action.payload || action.error.message || "Something went wrong.";

            })
    })

})


export const authActions = authSlice.actions;
export default authSlice;


