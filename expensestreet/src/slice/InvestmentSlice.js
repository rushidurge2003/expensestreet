import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DisplayInvestList } from "../component/invetsment/DisplayInvestList";
import { StockMarket } from "../component/invetsment/StockMarket";
import { MutualFund } from "../component/invetsment/MutualFund";
import { RealEstate } from "../component/invetsment/RealEstate";
import { FixedDeposit } from "../component/invetsment/FixedDeposit";

const initialState = {
    screenDisplay: <DisplayInvestList />
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
    }
})

export const { stockInvestment, backDisplayInevstment, mutualFundInvestment,
    realEstateInvestment, fixedDepositInvestment } = InvestmentSlice.actions
export default InvestmentSlice.reducer