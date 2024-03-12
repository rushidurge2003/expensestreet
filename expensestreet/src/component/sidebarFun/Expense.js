import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllExpense, updateExpense, deleteExpense } from '../../slice/RecordSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, Select, DatePicker,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const Expense = () => {
    const date = new Date()
    const [result, setResult] = useState([])
    const [expId, setExpId] = useState(null)

    useEffect(() => {
        displayData()
    }, [])

    // For Expense -------------------------
    const [expAmount, setExpAmount] = useState(0)
    const [expDate, setExpDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [expDescription, setExpDescription] = useState("")
    const [expType, setExpType] = useState("")
    const [expCategory, setExpCategory] = useState("")

    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const showModalExpense = (amount, date, description, type, category) => {
        setIsExpenseOpen(true);
        setExpAmount(amount)
        setExpDate(date)
        setExpDescription(description)
        setExpType(type)
        setExpCategory(category)
    };
    const handleOkExpense = () => {
        setIsExpenseOpen(false);
        dispatch(updateExpense({ "username": localStorage.getItem("username"), "expId": expId, "amount": expAmount, "date": expDate, "description": expDescription, "type": expType, "category": expCategory }))
        dispatch(getAllExpense(localStorage.getItem("username")))
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpType("")
        setExpCategory("")
        dispatch(getAllExpense(localStorage.getItem("username")))
    };
    const handleCancelExpense = () => {
        setIsExpenseOpen(false);
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpType("")
        setExpCategory("")
    };

    // -------------------

    const state = useSelector((state) => state.RecordSliceReducer.expenseData)
    const dispatch = useDispatch()

    const data = state.map((x) => {
        return ({
            id: x.expenseId,
            date: (x.date).slice(0, 19).replace('T', ' '),
            amount: x.amount,
            description: x.description,
            type: x.type,
            category: x.category
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

    const DeleteExp = (Id) => {
        dispatch(deleteExpense({ "username": localStorage.getItem("username"), "expId": Id }))
        dispatch(getAllExpense(localStorage.getItem("username")))
        console.log("check fact 1: ", localStorage.getItem("username"));
        console.log("check fact 2: ", expId);
        dispatch(getAllExpense(localStorage.getItem("username")))
    }

    const dataTable = () => {
        return (
            <>
                <table className="table table-hover">
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
                            data.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{d.date}</td>
                                        <td>{d.amount}</td>
                                        <td>{d.description}</td>
                                        <td>{d.type}</td>
                                        <td>{d.category}</td>
                                        <td className='d-flex justify-content-evenly'>
                                            <Tooltip title="Edit">
                                                <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                    onClick={() => {
                                                        showModalExpense(d.amount, d.date, d.description, d.type, d.category)
                                                        setExpId(d.id)
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                    onClick={() => { DeleteExp(d.id) }}
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
                <div><h5 style={{ marginTop: "50%" }}>Expenses</h5></div>
                <div>{displayAllExpense()}</div>
            </div>
            {
                state.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : dataTable()
            }

            <Modal width={500} title="Add Expense" open={isExpenseOpen} onOk={handleOkExpense} onCancel={handleCancelExpense}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Amount">
                        <Input value={expAmount} onChange={(e) => setExpAmount(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Date">
                        {/* <DatePicker defaultValue={(date.getFullYear() - date.getMonth() - date.getDate()).toString} onChange={(e) => setExpDate(e.target.value)} /> */}
                        <DatePicker value={dayjs(expDate)} onChange={(_, strDate) => setExpDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input value={expDescription} onChange={(e) => setExpDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Type">
                        <Select value={expType} onChange={(_, opt) => setExpType(opt.value)}>
                            <Select.Option value="Cash">Cash</Select.Option>
                            <Select.Option value="Online">Online</Select.Option>
                            <Select.Option value="Card">Card</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category">
                        <Select value={expCategory} onChange={(_, opt) => setExpCategory(opt.value)}>
                            <Select.Option value="Utilities">Utilities</Select.Option>
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Entertainment">Entertainment</Select.Option>
                            <Select.Option value="Tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Image">
                        <strong><small>Feature add in next update</small></strong>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}
