import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense, getAllExpense } from '../../slice/RecordSlice';
import dayjs from 'dayjs'
import {
    Form,
    FloatButton,
    Modal,
    Input,
    Select,
    DatePicker,
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
    const [incType, setIncType] = useState("")
    const [incCategory, setIncCategory] = useState("")
    const [isIncomeOpen, setIsIncomeOpen] = useState(false);
    const showModalIncome = () => {
        setIsIncomeOpen(true);
    };
    const handleOkIncome = () => {
        setIsIncomeOpen(false);
    };
    const handleCancelIncome = () => {
        setIsIncomeOpen(false);
    };


    // For Expense
    const [expAmount, setExpAmount] = useState(0)
    const [expDate, setExpDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [expDescription, setExpDescription] = useState("")
    const [expType, setExpType] = useState("")
    const [expCategory, setExpCategory] = useState("")
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const showModalExpense = () => {
        setIsExpenseOpen(true);
    };
    const handleOkExpense = () => {
        setIsExpenseOpen(false);
        dispatch(addExpense({ "username": localStorage.getItem("username"), "amount": expAmount, "date": expDate, "description": expDescription, "type": expType, "category": expCategory }))
        dispatch(getAllExpense(localStorage.getItem("username")))
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpType("")
        setExpCategory("")
    };
    const handleCancelExpense = () => {
        setIsExpenseOpen(false);
        setExpAmount(0)
        setExpDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setExpDescription("")
        setExpType("")
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
                <FloatButton tooltip={<><div>Income</div></>} icon={<CommentOutlined />} onClick={showModalIncome} />
                <FloatButton tooltip={<><div>Expense</div></>} icon={<CommentOutlined />} onClick={showModalExpense} />
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
                    <Form.Item label="Type">
                        <Select onChange={(_, opt) => setExpType(opt.value)}>
                            <Select.Option value="Cash">Cash</Select.Option>
                            <Select.Option value="Online">Online</Select.Option>
                            <Select.Option value="Card">Card</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category">
                        <Select onChange={(_, opt) => setExpCategory(opt.value)}>
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
