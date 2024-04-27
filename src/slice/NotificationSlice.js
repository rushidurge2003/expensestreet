import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    notificationData: [],
    notificationCount : 0
}

const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNotification.pending, (state, action) => {
        });
        builder.addCase(getNotification.fulfilled, (state, action) => {
            state.notificationData = action.payload
        });
        builder.addCase(getNotification.rejected, (state, action) => {
        });

        builder.addCase(getNotificationCount.pending, (state, action) => {
        });
        builder.addCase(getNotificationCount.fulfilled, (state, action) => {
            state.notificationCount = action.payload
        });
        builder.addCase(getNotificationCount.rejected, (state, action) => {
        });
    }
})

export const getNotification = createAsyncThunk(
    "getNotification",
    async (username) => {
        try {
            const result = await axios.get("https://expbackend.onrender.com/getNotification/" + username)
            return result
        } catch (error) {

        }
    }
)

export const getNotificationCount = createAsyncThunk(
    "getNotificationCount",
    async (username) => {
        try {
            const result = await axios.get("https://expbackend.onrender.com/getNotificationCount/" + username)
            return result.data[0].notificationCount
        } catch (error) {

        }
    }
)

export default NotificationSlice.reducer