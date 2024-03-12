import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteIncome, getAllIncome, updateIncome } from '../../slice/RecordSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const Income = () => {

    const date = new Date()

    const [result, setResult] = useState([])
    const [incId, setIncId] = useState(null)

    const [incAmount, setIncAmount] = useState(0)
    const [incDate, setIncDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [incDescription, setIncDescription] = useState("")

    const [isIncomeOpen, setIsIncomeOpen] = useState(false);
    const showModalIncome = (amount, date, description) => {
        setIsIncomeOpen(true);
        setIncAmount(amount)
        setIncDate(date)
        setIncDescription(description)
    };
    const handleOkIncome = () => {
        setIsIncomeOpen(false);
        dispatch(updateIncome({ "username": localStorage.getItem("username"), "incId": incId, "amount": incAmount, "date": incDate, "description": incDescription }))
        dispatch(getAllIncome(localStorage.getItem("username")))
        setIncAmount(0)
        setIncDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setIncDescription("")
        dispatch(getAllIncome(localStorage.getItem("username")))
    };
    const handleCancelIncome = () => {
        setIsIncomeOpen(false);
        setIncAmount(0)
        setIncDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setIncDescription("")
    };

    useEffect(() => {
        displayData()
    }, [])

    const state = useSelector((state) => state.RecordSliceReducer.incomeData)
    const dispatch = useDispatch()

    const displayData = () => {
        dispatch(getAllIncome(localStorage.getItem("username")))
        setResult(state)
    }

    const data = state.map((x, index) => {
        return ({
            key: index,
            id: x.incomeId,
            date: (x.date).slice(0, 19).replace('T', ' '),
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

    const DeleteInc = (Id) => {
        dispatch(deleteIncome({ "username": localStorage.getItem("username"), "incId": Id }))
        dispatch(getAllIncome(localStorage.getItem("username")))
        dispatch(getAllIncome(localStorage.getItem("username")))
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
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{d.date}</td>
                                        <td>{d.amount}</td>
                                        <td>{d.description}</td>
                                        <td className='d-flex justify-content-evenly'>
                                            <Tooltip title="Edit">
                                                <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                    onClick={() => {
                                                        showModalIncome(d.amount, d.date, d.description)
                                                        setIncId(d.id)
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} 
                                                    onClick={()=>{DeleteInc(d.id)}}
                                                />
                                            </Tooltip>
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
                <div><h5 style={{ marginTop: "50%" }}>Income</h5></div>
                <div>{displayAllIncome()}</div>
            </div>
            {
                state.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : dataTable()
            }

            <Modal width={500} title="Add Income" open={isIncomeOpen} onOk={handleOkIncome} onCancel={handleCancelIncome}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Amount">
                        <Input value={incAmount} onChange={(e) => setIncAmount(e.target.value)} />
                    </Form.Item><Form.Item label="Date">
                        <DatePicker value={dayjs(incDate)} onChange={(_, strDate) => setIncDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input value={incDescription} onChange={(e) => setIncDescription(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}
