import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, getAllExpense, addIncome, getAllIncome } from '../../slice/RecordSlice';
import dayjs from 'dayjs'
import {
    Form, FloatButton, Modal, Input, Select,
    DatePicker, Tooltip, message
} from 'antd'
import {
    PlusOutlined,
    CommentOutlined,
} from '@ant-design/icons';

export const AddRecord = () => {

    const date = new Date()
    const dispatch = useDispatch()

    // For Income
    const [incAmount, setIncAmount] = useState(0)
    const [incDate, setIncDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [incDescription, setIncDescription] = useState("")

    const [isIncomeOpen, setIsIncomeOpen] = useState(false);
    const showModalIncome = () => {
        setIsIncomeOpen(true);
    };
    const handleOkIncome = () => {
        if (incAmount <= 0) {
            message.warning("please enter amount")
        }
        else if (incDescription === "") {
            message.warning("Please enter description")
        }
        else {
            setIsIncomeOpen(false);
            dispatch(addIncome({ "username": localStorage.getItem("username"), "amount": incAmount, "date": incDate + ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, "description": incDescription }))
            dispatch(getAllIncome(localStorage.getItem("username")))
            setIncAmount(0)
            setIncDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setIncDescription("")
            dispatch(getAllIncome(localStorage.getItem("username")))
            message.success("Income add successfully")
        }
    };
    const handleCancelIncome = () => {
        setIsIncomeOpen(false);
        setIncAmount(0)
        setIncDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setIncDescription("")
    };


    // For Expense
    const [expAmount, setExpAmount] = useState(0)
    const [expDate, setExpDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [expDescription, setExpDescription] = useState("")
    const [expPayment_Mode, setExpPayment_Mode] = useState("")
    const [expCategory, setExpCategory] = useState("")

    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const showModalExpense = () => {
        setIsExpenseOpen(true);
    };
    const handleOkExpense = () => {
        if (expAmount <= 0) {
            message.warning("please enter amount")
        }
        else if (expDescription === "") {
            message.warning("Please enter description")
        }
        else if (expPayment_Mode === "") {
            message.warning("Please select payment mode")
        }
        else if (expCategory === "") {
            message.warning("Please select category")
        }
        else {
            setIsExpenseOpen(false);
            dispatch(addExpense({ "username": localStorage.getItem("username"), "amount": expAmount, "date": expDate + ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, "description": expDescription, "payment_mode": expPayment_Mode, "category": expCategory }))
            dispatch(getAllExpense(localStorage.getItem("username")))
            setExpAmount(0)
            setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setExpDescription("")
            setExpPayment_Mode("")
            setExpCategory("")
            dispatch(getAllExpense(localStorage.getItem("username")))
            message.success("Expense add successfully")
        }
    };
    const handleCancelExpense = () => {
        setIsExpenseOpen(false);
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpPayment_Mode("")
        setExpCategory("")
    };

    return (
        <>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 40, bottom: 100 }}
                icon={<PlusOutlined />}
                tooltip={<><div>Record your Expense/Income</div></>}
            >
                <Tooltip title="Add Income" open placement='left'>
                    <FloatButton icon={<CommentOutlined />} onClick={showModalIncome} />
                </Tooltip>
                <Tooltip title="Add Expense" open placement='left'>
                    <FloatButton icon={<CommentOutlined />} onClick={showModalExpense} />
                </Tooltip>
                {/* <FloatButton tooltip={<><div>Income</div></>} icon={<CommentOutlined />} onClick={showModalIncome} />
                <FloatButton tooltip={<><div>Expense</div></>} icon={<CommentOutlined />} onClick={showModalExpense} /> */}
            </FloatButton.Group>


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
                    <Form.Item label="Payment Mode">
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
