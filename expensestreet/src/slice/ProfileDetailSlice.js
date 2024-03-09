import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userData: []
}

const ProfileDetailSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetails.pending, (state, action) => {
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.userData = action.payload
        });
        builder.addCase(getUserDetails.rejected, (state, action) => {
        });
    }
})

export const getUserDetails = createAsyncThunk(
    "getUserDetails",
    async (username) => {
        const result = await axios.get("http://localhost:9000/userprofile/" + username)
        return result
    }
)

export default ProfileDetailSlice.reducer