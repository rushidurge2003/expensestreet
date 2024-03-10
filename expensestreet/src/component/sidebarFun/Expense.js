import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExpense } from '../../slice/RecordSlice'
import { Empty, Card, Statistic,Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const Expense = () => {

    const [result, setResult] = useState([])

    useEffect(() => {
        displayData()
    }, [])

    const state = useSelector((state) => state.RecordSliceReducer.expenseData)
    const dispatch = useDispatch()

    const data = state.map((x, index) => {
        return ({
            date: x.date,
            amount: x.amount,
            description: x.description,
            type:x.type,
            category:x.category
        })
    })

    const displayData = () => {
        dispatch(getAllExpense(localStorage.getItem("username")))
        setResult(state)
    }

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

    const dataTable = () => {
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d,index)=>{
                                return(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{d.date}</td>
                                        <td>{d.amount}</td>
                                        <td>{d.description}</td>
                                        <td>{d.type}</td>
                                        <td>{d.category}</td>
                                        <td>
                                            <td> <Button type="primary" danger shape="circle" icon={<SearchOutlined />} /></td>
                                            <td> <Button type="primary" shape="circle" icon={<SearchOutlined />} /></td>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
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
                state.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : dataTable()
            }

        </>
    )
}
