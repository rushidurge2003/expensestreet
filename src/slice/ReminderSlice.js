import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reminderData: []
}

const ReminderSlice = createSlice({
    name: "reminder",
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

export const addReminder = createAsyncThunk(
    "addReminder",
    async (data) => {
        try {
            await axios.post("http://localhost:9000/addReminder", { ...data});
            // await axios.post("http://localhost:9000/addReminder", { ...data,"nanoid":nanoid() });
        } catch (error) {

        }
    }
)

export const getReminderData = createAsyncThunk(
    "getReminderData",
    async (username) => {
        try {
            const result = await axios.get("http://localhost:9000/getReminderData/" + username);
            return result
        } catch (error) {

        }
    }
)

export const sendReminderEmail = createAsyncThunk(
    "sendReminderEmail",
    async (data) => {
        try {
            await axios.post("http://localhost:9000/sendReminderEmail", { ...data });
        } catch (error) {

        }
    }
)

export const deleteReminder = createAsyncThunk(
    "deleteReminder",
    async (data) => {
        try {
            await axios.post("http://localhost:9000/deleteReminder", { ...data });
        } catch (error) {

        }
    }
)

export const statusTrueReminder = createAsyncThunk(
    "statusTrueReminder",
    async (data) => {
        try {
            await axios.post("http://localhost:9000/statusTrueReminder", { ...data });
        } catch (error) {

        }
    }
)

export default ReminderSlice.reducer