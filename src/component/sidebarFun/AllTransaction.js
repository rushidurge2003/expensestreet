import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteIncome, getAllIncome, updateIncome, deleteExpense, getAllExpense, updateExpense } from '../../slice/RecordSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker, Select, Badge, FloatButton
} from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive'
import { color } from 'chart.js/helpers'

export const AllTransaction = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

    const date = new Date()

    useEffect(() => {
        displayData()
    }, [])

    // For Expense -------------------------
    const [expId, setExpId] = useState(null)

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

    // ------------------- For Income

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
        dispatch(updateIncome({ "username": localStorage.getItem("username"), "incId": incId, "amount": incAmount, "date": (incDate).slice(0, 19).replace('T', ' '), "description": incDescription }))
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
    // --------------------

    const incState = useSelector((state) => state.RecordSliceReducer.incomeData)
    const expState = useSelector((state) => state.RecordSliceReducer.expenseData)
    const dispatch = useDispatch()

    const incData = incState.map((x, index) => {
        return ({
            key: index,
            id: x.incomeId,
            // date: (x.date).slice(0, 19).replace('T', ' '),
            date: x.date,
            amount: x.amount,
            description: x.description,
            type: x.type
        })
    })

    const expData = expState.map((x) => {
        return ({
            id: x.expenseId,
            // date: (x.date).slice(0, 19).replace('T', ' '),
            date: x.date,
            amount: x.amount,
            description: x.description,
            payment_mode: x.payment_mode,
            category: x.category,
            type: x.type
        })
    })

    const allDataTransaction = [...incData, ...expData]

    allDataTransaction.sort((a, b) => (new Date(b.date) - new Date(a.date)))

    const DeleteExp = (Id, amount, date, description, payment_mode, category, type) => {
        dispatch(deleteExpense({ "username": localStorage.getItem("username"), "expId": Id, "amount": amount, "date": date, "description": description, "payment_mode": payment_mode, "category": category, "type": type }))
        dispatch(getAllExpense(localStorage.getItem("username")))
        dispatch(getAllExpense(localStorage.getItem("username")))
    }

    const DeleteInc = (Id, amount, date, description, type) => {
        dispatch(deleteIncome({ "username": localStorage.getItem("username"), "incId": Id, "amount": amount, "date": date, "description": description, "type": type }))
        dispatch(getAllIncome(localStorage.getItem("username")))
        dispatch(getAllIncome(localStorage.getItem("username")))
    }

    const displayData = () => {
        dispatch(getAllExpense(localStorage.getItem("username")))
        dispatch(getAllIncome(localStorage.getItem("username")))
    }

    // Click i button to see transaction information (Mobile View)
    const infoExpense = (amount, desc, mode, category) => {
        Modal.info({
            title: `${amount} ₹`,
            content: (
                <div>
                    <p>Description : {desc}</p>
                    <p>Payment Mode : {mode}</p>
                    <p>Category : {category}</p>
                </div>
            ),
            onOk() { },
        });
    };

    const infoIncome = (amount, desc) => {
        Modal.info({
            title: `${amount} ₹`,
            content: (
                <div>
                    <p>Description : {desc}</p>
                </div>
            ),
            onOk() { },
        });
    };

    const dataTable = () => {
        return (
            <>
                <table className="table table-hover">
                    <thead>
                        <tr align="center">
                            <th style={{ display: isMobile ? "none" : "" }}>#</th>
                            <th >Type</th>
                            <th >Date</th>
                            <th >Amount</th>
                            <th style={{ display: isMobile ? "none" : "" }}>Description</th>
                            <th style={{ display: isMobile ? "none" : "" }}>Payment Mode</th>
                            <th style={{ display: isMobile ? "none" : "" }}>Category</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDataTransaction.map((d, index) => {
                                if (d.type === "expense") {
                                    return (
                                        <tr key={index} align="center">
                                            <td style={{ display: isMobile ? "none" : "" }}>{index + 1}</td>
                                            <td><Badge.Ribbon text="Expense" color='red'></Badge.Ribbon></td>
                                            <td>{(d.date).slice(0, 10)}</td>
                                            <td>{d.amount}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.description}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.payment_mode}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.category}</td>
                                            <td align='center'>
                                                <tr>
                                                    <td style={{ paddingRight: isMobile ? 0 : 20 }}>
                                                        <Tooltip title="Edit">
                                                            <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                                onClick={() => {
                                                                    showModalExpense(d.amount, d.date, d.description, d.payment_mode, d.category)
                                                                    setExpId(d.id)
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                    <td>
                                                        <Tooltip title="Delete">
                                                            <Button type="primary" style={{ marginLeft: isMobile ? 10 : 0 }} danger shape="circle" icon={<DeleteOutlined />}
                                                                onClick={() => { DeleteExp(d.id, d.amount, (d.date).slice(0, 19).replace("T", " "), d.description, d.payment_mode, d.category, d.type) }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            </td>
                                            <td style={{ display: isMobile ? "" : "none" }}>
                                                <Button shape='circle' icon={<InfoCircleOutlined />} onClick={() => infoExpense(d.amount, d.description, d.payment_mode, d.category)} />
                                            </td>
                                        </tr>
                                    )
                                }
                                if (d.type === "income") {
                                    return (
                                        <tr align="center">
                                            <td style={{ display: isMobile ? "none" : "" }}>{index + 1}</td>
                                            <td><Badge.Ribbon text="Income" color='green'></Badge.Ribbon></td>
                                            <td>{(d.date).slice(0, 10)}</td>
                                            <td>{d.amount}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.description}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>-</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>-</td>
                                            <td align='center'>
                                                <tr>
                                                    <td style={{ paddingRight: isMobile ? 0 : 20 }}>
                                                        <Tooltip title="Edit">
                                                            <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                                onClick={() => {
                                                                    showModalIncome(d.amount, d.date, d.description)
                                                                    setIncId(d.id)
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                    <td>
                                                        <Tooltip title="Delete">
                                                            <Button type="primary" style={{ marginLeft: isMobile ? 10 : 0 }} danger shape="circle" icon={<DeleteOutlined />}
                                                                onClick={() => { DeleteInc(d.id, d.amount, (d.date).slice(0, 19).replace("T", " "), d.description, d.type) }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            </td>
                                            <td style={{ display: isMobile ? "" : "none" }}>
                                                <Button shape='circle' icon={<InfoCircleOutlined />} onClick={() => infoIncome(d.amount, d.description)} />
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }

    const incSum = () => {
        const sum = incData.reduce((pre, curr) => pre + Number(curr.amount), 0)
        return sum
    }

    const expSum = () => {
        const sum = expData.reduce((pre, curr) => pre + Number(curr.amount), 0)
        return sum
    }

    const displayAllIncome = () => {
        return (
            <>
                <Card bordered={true} style={{ width: isMobile ? 150 : "", height: 100 }}>
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
                        suffix={isMobile ? "" : "₹"}
                    />
                </Card>
            </>
        )
    }


    const displayAllExpense = () => {
        return (
            <>
                <Card bordered={true} style={{ width: isMobile ? 150 : "", height: 100 }}>
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
                        suffix={isMobile ? "" : "₹"}
                    />
                </Card>
            </>
        )
    }

    const displayBalance = () => {
        return (
            <>
                <Card bordered={true} style={{ width: isMobile ? 150 : "", height: 100 }}>
                    <Statistic
                        title="Balance"
                        value={
                            incSum() - expSum()
                        }
                        precision={2}
                        valueStyle={{
                            color: 'black',
                        }}
                        // prefix={<ArrowUpOutlined />}
                        suffix={isMobile ? "" : "₹"}
                    />
                </Card>
            </>
        )
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: isMobile ? "space-evenly" : "space-between" }}>
                <div><h5 style={{ marginTop: "40%", display: isMobile ? "none" : "" }}>AllTransaction</h5></div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: isMobile ? "" : "none" }}>
                        <h6>Balance : <b style={{ color: incSum() - expSum() > 0 ? "green" : "red" }}>{incSum() - expSum()}</b></h6>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div>{displayAllIncome()}</div>
                        <div>{displayAllExpense()}</div>
                        <div style={{ display: isMobile ? "none" : "" }}>{displayBalance()}</div>
                    </div>
                </div>
            </div>
            {
                allDataTransaction.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : dataTable()
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
            <FloatButton.BackTop visibilityHeight={250} style={{ right: 20, bottom: 100 }} />
        </>
    )
}
