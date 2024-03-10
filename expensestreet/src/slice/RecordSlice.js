import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    expenseData: [],
    incomeData: []
}

const RecordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllExpense.pending, (state, action) => {
        });
        builder.addCase(getAllExpense.fulfilled, (state, action) => {
            state.expenseData = action.payload.data
        });
        builder.addCase(getAllExpense.rejected, (state, action) => {
        });
    }
})

export const addExpense = createAsyncThunk(
    "addExpense",
    async (data) => {
        await axios.post("http://localhost:9000/addExpense", { ...data })
    }
)

export const getAllExpense = createAsyncThunk(
    "getAllExpense",
    async (username) => {
        const result = await axios.get("http://localhost:9000/getAllExpense/" + username)
        return result
    }
)

export const addIncome = createAsyncThunk(
    "addIncome",
    async (data) => {
        await axios.post("http://localhost:9000/addExpense", { ...data })
    }
)

export const getAllIncome = createAsyncThunk(
    "getAllIncome",
    async (username) => {
        const result = await axios.get("http://localhost:9000/getAllExpense/" + username)
        return result
    }
)

export default RecordSlice.reducer