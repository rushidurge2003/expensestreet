import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExpense } from '../../slice/RecordSlice'
import { Table, Empty, Card, Statistic } from 'antd';

export const Expense = () => {

    const [result, setResult] = useState([])

    useEffect(() => {
        displayData()
    }, [])

    const state = useSelector((state) => state.RecordSliceReducer.expenseData)
    const dispatch = useDispatch()

    const displayData = () => {
        dispatch(getAllExpense(localStorage.getItem("username")))
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
            // sorter: {
            //     compare: (a, b) => a.date - b.date,
            //     multiple: 4,
            // },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            // sorter: {
            //     compare: (a, b) => a.type - b.type,
            //     multiple: 4,
            // },
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            // sorter: {
            //     compare: (a, b) => a.category - b.category,
            //     multiple: 1,
            // },
        },
    ];

    const data = state.map((x, index) => {
        return ({
            key: index,
            srno: index + 1,
            date: x.date,
            amount: x.amount,
            type: x.type,
            description: x.description,
            category: x.category,
        })
    })

    const expSum = () => {
        const sum = data.reduce((pre, curr) => pre + Number(curr.amount), 0)
        return sum
    }

    const displayAllExpense = () => {
        return (
            <>
                <Card bordered={false}>
                    <Statistic
                        title="Total Expense"
                        value={
                            expSum()
                        }
                        precision={2}
                        valueStyle={{
                            color: 'red',
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
                <div><h5 style={{ marginTop: "50%" }}>Expenses</h5></div>
                <div>{displayAllExpense()}</div>
            </div>
            {
                state.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : <Table columns={columns} dataSource={data} onChange={onChange} />
            }

        </>
    )
}
