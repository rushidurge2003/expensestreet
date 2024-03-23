import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getStockInvest, getMutualFundInvest, getFixedDepositInvest, getRealEstateInvest } from '../../slice/InvestmentSlice';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const InvestmentPie = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        getInvetmentData()
    }, [])

    const getInvetmentData = () => {
        dispatch(getStockInvest(localStorage.getItem("username")))
        dispatch(getMutualFundInvest(localStorage.getItem("username")))
        dispatch(getRealEstateInvest(localStorage.getItem("username")))
        dispatch(getFixedDepositInvest(localStorage.getItem("username")))
    }

    const stock = useSelector((state) => state.InvestmentSliceReducer.stockData.data)
    const mutualfund = useSelector((state) => state.InvestmentSliceReducer.mutulaFundData.data)
    const realestate = useSelector((state) => state.InvestmentSliceReducer.realEstateData.data)
    const fixeddeposit = useSelector((state) => state.InvestmentSliceReducer.fixedDepositData.data)

    const stockSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        stock?.forEach(element => {
            sum += element.total
        });
        return sum
    }

    const mutualFundSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        mutualfund?.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const realEstateSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        realestate?.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const fixedDepositSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        fixeddeposit?.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const options = {
        animationEnabled: true,
        showInLegend: true,
        title: {
            text: "Investment"
        },
        data: [{
            type: "pie",
            showInLegend: "true",
            legendText: "{label}",
            indexLabel: "{label} - {y} ₹",
            toolTipContent: "<b>{label}</b>: {y}<br> ₹",
            dataPoints: [
                { y: stockSum(), label: "Stock Market" },
                { y: mutualFundSum(), label: "Mutual Fund" },
                { y: realEstateSum(), label: "Real Estate" },
                { y: fixedDepositSum(), label: "Fixed Deposit" },
            ],
        }]
    }

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    )
}
