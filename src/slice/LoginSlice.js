import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    logInUsername: "",
    logInPassword: "",
    isAuthenticated: false,
    logIn: []
}

const LoginSlice = createSlice({
    name: "loginData",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state, action) => {
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            // state.isAuthenticated = action.payload.data.isAuthenticated
            state.logIn = action.payload
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
        });
    }
})

export const LoginUser = createAsyncThunk(
    "LoginUser",
    async (d) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/login`, { ...d });
            return result;
        } catch (error) {

        }
    }
)

export default LoginSlice.reducer