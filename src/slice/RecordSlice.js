import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    expenseData: [],
    incomeData: [],
    deleteTransData: []
}

const RecordSlice = createSlice({
    name: "record",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // For Expense Data
        builder.addCase(getAllExpense.pending, (state, action) => {
        });
        builder.addCase(getAllExpense.fulfilled, (state, action) => {
            state.expenseData = action.payload.data
        });
        builder.addCase(getAllExpense.rejected, (state, action) => {
        });
        // For Income Data
        builder.addCase(getAllIncome.pending, (state, action) => {
        });
        builder.addCase(getAllIncome.fulfilled, (state, action) => {
            state.incomeData = action.payload.data
        });
        builder.addCase(getAllIncome.rejected, (state, action) => {
        });
        // For Deleted Transaction Data
        builder.addCase(getdeleteTransData.pending, (state, action) => {
        });
        builder.addCase(getdeleteTransData.fulfilled, (state, action) => {
            state.deleteTransData = action.payload.data
        });
        builder.addCase(getdeleteTransData.rejected, (state, action) => {
        });
    }
})

export const addExpense = createAsyncThunk(
    "addExpense",
    async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/addExpense`, { ...data })
    }
)

export const getAllExpense = createAsyncThunk(
    "getAllExpense",
    async (username) => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllExpense/` + username)
        return result
    }
)

export const updateExpense = createAsyncThunk(
    "updateExpense",
    async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateExpense`, { ...data })
    }
)

export const deleteExpense = createAsyncThunk(
    "deleteExpense",
    async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteExpense`, { ...data })
    }
)

export const addIncome = createAsyncThunk(
    "addIncome",
    async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/addIncome`, { ...data })
    }
)

export const getAllIncome = createAsyncThunk(
    "getAllIncome",
    async (username) => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getAllIncome/` + username)
        return result
    }
)

export const updateIncome = createAsyncThunk(
    "updateIncome",
    async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateIncome`, { ...data })
    }
)

export const deleteIncome = createAsyncThunk(
    "deleteIncome",
    async (data) => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteIncome`, { ...data })
    }
)

// =====================
// 
//  Deleted Tab Operation
// 
// =====================

export const getdeleteTransData = createAsyncThunk(
    "getdeleteTransData",
    async (username) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getdeleteTransData/` + username)
            return result
        } catch (error) {

        }
    }
)

export const deleteDeletedTrans = createAsyncThunk(
    "deleteDeletedTrans",
    async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteDeletedTrans`, { ...data })
        } catch (error) {

        }
    }
)

export const deletRestoreExpense = createAsyncThunk(
    "deletRestoreExpense",
    async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/deletRestoreExpense`, { ...data })
        } catch (error) {

        }
    }
)

export const deleteRestoreIncome = createAsyncThunk(
    "deleteRestoreIncome",
    async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteRestoreIncome`, { ...data })
        } catch (error) {

        }
    }
)


export default RecordSlice.reducer