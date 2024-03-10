import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllIncome } from '../../slice/RecordSlice'
import { Table,Empty, Card, Statistic } from 'antd';

export const Income = () => {

    const [result, setResult] = useState([])

    useEffect(() => {
        displayData()
    }, [])

    const state = useSelector((state) => state.RecordSliceReducer.incomeData)
    const dispatch = useDispatch()

    const displayData = () => {
        dispatch(getAllIncome(localStorage.getItem("username")))
        setResult(state)
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: 'Sr.No',
            dataIndex: 'srno',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: {
                compare: (a, b) => a.amount - b.amount,
                multiple: 3,
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
    ];

    const data = state.map((x, index) => {
        return ({
            key: index,
            srno: index + 1,
            date: x.date,
            amount: x.amount,
            description: x.description,
        })
    })

    const incSum = () => {
        const sum = data.reduce((pre, curr) => pre + Number(curr.amount), 0)
        return sum
    }

    const displayAllIncome = () => {
        return (
            <>
                <Card bordered={false}>
                    <Statistic
                        title="Total Income"
                        value={
                            incSum()
                        }
                        precision={2}
                        valueStyle={{
                            color: 'green',
                        }}
                        // prefix={<ArrowUpOutlined />}
                        suffix="₹"
                    />
                </Card>
            </>
        )
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div><h5 style={{ marginTop: "50%" }}>Income</h5></div>
                <div>{displayAllIncome()}</div>
            </div>
            {
                state.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : <Table columns={columns} dataSource={data} onChange={onChange} />
            }

        </>
    )
}
