import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    signUsername: "",
    signPassword: "",
    signUpTrue: false,
    signData: [],
    userExist: true
}

const SignUpSlice = createSlice({
    name: "signUpData",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.signData = action.payload
        });
        builder.addCase(getUser.rejected, (state, action) => {
        });
        // ---------------------
        builder.addCase(signupUser.pending, (state, action) => {
            state.signUpTrue = false
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.signUpTrue = true
            state.signData = action.payload
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.signUpTrue = false
        });
        // --------------------- User Exist Boolean Operation
        builder.addCase(userExist.pending, (state, action) => {
        });
        builder.addCase(userExist.fulfilled, (state, action) => {
            state.userExist = action.payload.data.exist
        });
        builder.addCase(userExist.rejected, (state, action) => {
        });
    }
    
})

export const getUser = createAsyncThunk(
    "getUser",
    async () => {
        try {
            const result = await axios.get("http://localhost:9000/getUser")
            return result;
        } catch (error) {
            
        }
    }
)

export const signupUser = createAsyncThunk(
    "signupUser",
    async (d) => {
        try {
            const result = await axios.post("http://localhost:9000/signup", { ...d });
            return result;
        } catch (error) {

        }
    }
)

export const userExist = createAsyncThunk(
    "userExist",
    async (username) => {
        try {
            const result = await axios.get("http://localhost:9000/userexist/"+username)
            return result;
        } catch (error) {
            
        }
    }
)

export default SignUpSlice.reducer