import React, { useState, useEffect } from 'react'
import { Card, Statistic } from 'antd';
import stockmarketimg from './images/bull-market.png'
import mutualfundimg from './images/statistics.png'
import realestateimg from './images/investment.png'
import fixeddepositeimg from './images/deposit.png'
import { stockInvestment, mutualFundInvestment, realEstateInvestment, fixedDepositInvestment } from '../../slice/InvestmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getStockInvest, getMutualFundInvest, getFixedDepositInvest, getRealEstateInvest } from '../../slice/InvestmentSlice';
import { InvestmentPie } from '../graph/InvestmentPie';
import { useMediaQuery } from 'react-responsive'

const { Meta } = Card;

export const DisplayInvestList = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

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

    return (
        <>
            <div style={{ display: "flex", justifyContent: isMobile ? "center" : "space-between" }}>
                <div style={{ margin: "20px", display: isMobile ? "none" : "" }}><h5>Investment</h5></div>
                <Card bordered={true}>
                    <Statistic
                        title="Total Investment"
                        value={stockSum() + mutualFundSum() + realEstateSum() + fixedDepositSum()}
                        precision={2}
                        valueStyle={{ color: 'black' }}
                        suffix="₹"
                    />
                </Card>
            </div>
            <div className='row'>
                <div className='col-md-3 col-sm-6 my-2 d-flex justify-content-center text-center'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={stockmarketimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(stockInvestment()) }}
                    >
                        <Meta title="Stock Market" description={<b style={{ color: "black" }}>{stockSum()} ₹</b>} />
                    </Card>
                </div>
                <div className='col-md-3 col-sm-6 my-2 d-flex justify-content-center text-center'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={mutualfundimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(mutualFundInvestment()) }}
                    >
                        <Meta title="Mutual Fund" description={<b style={{ color: "black" }}>{mutualFundSum()} ₹</b>} />
                    </Card>
                </div>
                <div className='col-md-3 col-sm-6 my-2 d-flex justify-content-center text-center'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={realestateimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(realEstateInvestment()) }}
                    >
                        <Meta title="Real Estate" description={<b style={{ color: "black" }}>{realEstateSum()} ₹</b>} />
                    </Card>
                </div>
                <div className='col-md-3 col-sm-6 my-2 d-flex justify-content-center text-center'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={fixeddepositeimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(fixedDepositInvestment()) }}
                    >
                        <Meta title="Fixed Deposit" description={<b style={{ color: "black" }}>{fixedDepositSum()} ₹</b>} />
                    </Card>
                </div>
            </div>
            <hr />
            <div>
                <br />
                <InvestmentPie />
            </div>
        </>
    )
}
