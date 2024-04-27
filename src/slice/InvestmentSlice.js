import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DisplayInvestList } from "../component/invetsment/DisplayInvestList";
import { StockMarket } from "../component/invetsment/StockMarket";
import { MutualFund } from "../component/invetsment/MutualFund";
import { RealEstate } from "../component/invetsment/RealEstate";
import { FixedDeposit } from "../component/invetsment/FixedDeposit";
import axios from "axios";

const initialState = {
    screenDisplay: <DisplayInvestList />,
    stockData: [],
    mutulaFundData: [],
    realEstateData: [],
    fixedDepositData: []
}

const InvestmentSlice = createSlice({
    name: "invetsment",
    initialState,
    reducers: {
        backDisplayInevstment(state) {
            state.screenDisplay = <DisplayInvestList />
        },
        stockInvestment(state) {
            state.screenDisplay = <StockMarket />
        },
        mutualFundInvestment(state) {
            state.screenDisplay = <MutualFund />
        },
        realEstateInvestment(state) {
            state.screenDisplay = <RealEstate />
        },
        fixedDepositInvestment(state) {
            state.screenDisplay = <FixedDeposit />
        }
    },
    extraReducers: (builder) => {
        // Stock Market Investment
        builder.addCase(getStockInvest.pending, (state, action) => {
        });
        builder.addCase(getStockInvest.fulfilled, (state, action) => {
            state.stockData = action.payload
        });
        builder.addCase(getStockInvest.rejected, (state, action) => {
        });

        // Mutual Fund Investment
        builder.addCase(getMutualFundInvest.pending, (state, action) => {
        });
        builder.addCase(getMutualFundInvest.fulfilled, (state, action) => {
            state.mutulaFundData = action.payload
        });
        builder.addCase(getMutualFundInvest.rejected, (state, action) => {
        });

        // Real Estate Investment
        builder.addCase(getRealEstateInvest.pending, (state, action) => {
        });
        builder.addCase(getRealEstateInvest.fulfilled, (state, action) => {
            state.realEstateData = action.payload
        });
        builder.addCase(getRealEstateInvest.rejected, (state, action) => {
        });

        // Fixed Deposite Investment
        builder.addCase(getFixedDepositInvest.pending, (state, action) => {
        });
        builder.addCase(getFixedDepositInvest.fulfilled, (state, action) => {
            state.fixedDepositData = action.payload
        });
        builder.addCase(getFixedDepositInvest.rejected, (state, action) => {
        });
    }
})


// Data Add Section
export const addStockInvest = createAsyncThunk(
    "addStockInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/addStockInvest", { ...data })
    }
)

export const addMutualFundInvest = createAsyncThunk(
    "addMutualFundInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/addMutualFundInvest", { ...data })
    }
)

export const addRealEstateInvest = createAsyncThunk(
    "addRealEstateInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/addRealEstateInvest", { ...data })
    }
)

export const addFixedDepositInvest = createAsyncThunk(
    "addFixedDepositInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/addFixedDepositInvest", { ...data })
    }
)

// Data Get Section

export const getStockInvest = createAsyncThunk(
    "getStockInvest",
    async (username) => {
        const result = await axios.get("https://expbackend.onrender.com/getStockInvest/" + username)
        return result
    }
)
export const getMutualFundInvest = createAsyncThunk(
    "getMutualFundInvest",
    async (username) => {
        const result = await axios.get("https://expbackend.onrender.com/getMutualFundInvest/" + username)
        return result
    }
)

export const getRealEstateInvest = createAsyncThunk(
    "getRealEstateInvest",
    async (username) => {
        const result = await axios.get("https://expbackend.onrender.com/getRealEstateInvest/" + username)
        return result
    }
)

export const getFixedDepositInvest = createAsyncThunk(
    "getFixedDepositInvest",
    async (username) => {
        const result = await axios.get("https://expbackend.onrender.com/getFixedDepositInvest/" + username)
        return result
    }
)


// Data Update Section

export const updateStockInvest = createAsyncThunk(
    "updateStockInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/updateStockInvest", { ...data })
    }
)

export const updateMutualFundInvest = createAsyncThunk(
    "updateMutualFundInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/updateMutualFundInvest", { ...data })
    }
)

export const updateRealEstateInvest = createAsyncThunk(
    "updateRealEstateInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/updateRealEstateInvest", { ...data })
    }
)

export const updateFixedDepositInvest = createAsyncThunk(
    "updateFixedDepositInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/updateFixedDepositInvest", { ...data })
    }
)

// Data Delete Section

export const deleteStockInvest = createAsyncThunk(
    "deleteStockInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/deleteStockInvest", { ...data })
    }
)


export const deleteMutualFundInvest = createAsyncThunk(
    "deleteMutualFundInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/deleteMutualFundInvest", { ...data })
    }
)

export const deleteRealEstateInvest = createAsyncThunk(
    "deleteRealEstateInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/deleteRealEstateInvest", { ...data })
    }
)

export const deleteFixedDepositInvest = createAsyncThunk(
    "deleteFixedDepositInvest",
    async (data) => {
        await axios.post("https://expbackend.onrender.com/deleteFixedDepositInvest", { ...data })
    }
)


export const { stockInvestment, backDisplayInevstment, mutualFundInvestment,
    realEstateInvestment, fixedDepositInvestment } = InvestmentSlice.actions
export default InvestmentSlice.reducer