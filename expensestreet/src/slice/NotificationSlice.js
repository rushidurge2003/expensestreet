import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {

}

const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getReminderData.pending, (state, action) => {
        });
        builder.addCase(getReminderData.fulfilled, (state, action) => {
            // state.isAuthenticated = action.payload.data.isAuthenticated
            state.reminderData = action.payload
        });
        builder.addCase(getReminderData.rejected, (state, action) => {
        });
    }
})