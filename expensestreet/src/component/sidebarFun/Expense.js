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
    const [expPayment_Mode, setExpPayment_Mode] = useState("")
    const [expCategory, setExpCategory] = useState("")

    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const showModalExpense = (amount, date, description, payment_mode, category) => {
        setIsExpenseOpen(true);
        setExpAmount(amount)
        setExpDate(date)
        setExpDescription(description)
        setExpPayment_Mode(payment_mode)
        setExpCategory(category)
    };
    const handleOkExpense = () => {
        setIsExpenseOpen(false);
        dispatch(updateExpense({ "username": localStorage.getItem("username"), "expId": expId, "amount": expAmount, "date": (expDate).slice(0, 19).replace('T', ' '), "description": expDescription, "payment_mode": expPayment_Mode, "category": expCategory }))
        dispatch(getAllExpense(localStorage.getItem("username")))
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpPayment_Mode("")
        setExpCategory("")
        dispatch(getAllExpense(localStorage.getItem("username")))
    };
    const handleCancelExpense = () => {
        setIsExpenseOpen(false);
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpPayment_Mode("")
        setExpCategory("")
    };

    // -------------------

    const state = useSelector((state) => state.RecordSliceReducer.expenseData)
    const dispatch = useDispatch()

    const data = state.map((x) => {
        return ({
            id: x.expenseId,
            // date: (x.date).slice(0, 19).replace('T', ' '),
            date: (x.date),
            amount: x.amount,
            description: x.description,
            payment_mode: x.payment_mode,
            category: x.category
        })
    })

    data.sort((a,b)=>(new Date(b.date) - new Date(a.date)))

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
                            <th scope="col">Payment Mode</th>
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
                                        <td>{(d.date).slice(0, 10)}</td>
                                        <td>{d.amount}</td>
                                        <td>{d.description}</td>
                                        <td>{d.payment_mode}</td>
                                        <td>{d.category}</td>
                                        <td className='d-flex justify-content-evenly'>
                                            <Tooltip title="Edit">
                                                <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                    onClick={() => {
                                                        showModalExpense(d.amount, d.date, d.description, d.payment_mode, d.category)
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
                        <Select value={expPayment_Mode} onChange={(_, opt) => setExpPayment_Mode(opt.value)}>
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
