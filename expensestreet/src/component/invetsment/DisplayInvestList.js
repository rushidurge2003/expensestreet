import React, { useState } from 'react'
import { Card,Statistic } from 'antd';
import stockmarketimg from './images/bull-market.png'
import mutualfundimg from './images/statistics.png'
import realestateimg from './images/investment.png'
import fixeddepositeimg from './images/deposit.png'
import { stockInvestment, mutualFundInvestment, realEstateInvestment, fixedDepositInvestment } from '../../slice/InvestmentSlice';
import { useDispatch } from 'react-redux';

const { Meta } = Card;

export const DisplayInvestList = () => {

    const dispatch = useDispatch()

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div style={{ margin: "20px" }}><h5>Investment</h5></div>
                <Card bordered={false}>
                    <Statistic
                        title="Total Investment"
                        value={0}
                        precision={2}
                        valueStyle={{ color: 'black' }}
                        suffix="₹"
                    />
                </Card>
            </div>
            <div className='row'>
                <div className='col-md-3 col-sm-6 my-2'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={stockmarketimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(stockInvestment()) }}
                    >
                        <Meta title="Stock Market" description={<b>500 ₹</b>} />
                    </Card>
                </div>
                <div className='col-md-3 col-sm-6 my-2'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={mutualfundimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(mutualFundInvestment()) }}
                    >
                        <Meta title="Mutual Fund" description={<b>500 ₹</b>} />
                    </Card>
                </div>
                <div className='col-md-3 col-sm-6 my-2'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={realestateimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(realEstateInvestment()) }}
                    >
                        <Meta title="Real Estate" description={<b>500 ₹</b>} />
                    </Card>
                </div>
                <div className='col-md-3 col-sm-6 my-2'>
                    <Card
                        hoverable
                        style={{
                            width: 200,
                        }}
                        cover={<div><img alt="example" src={fixeddepositeimg} style={{ width: "50%", padding: 10 }} /></div>}
                        onClick={() => { dispatch(fixedDepositInvestment()) }}
                    >
                        <Meta title="Fixed Deposit" description={<b>500 ₹</b>} />
                    </Card>
                </div>
            </div>
        </>
    )
}
