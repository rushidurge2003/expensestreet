import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteIncome, getAllIncome, updateIncome } from '../../slice/RecordSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker, FloatButton
} from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive'

export const Income = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

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
            // date: (x.date).slice(0, 19).replace('T', ' '),
            date: x.date,
            amount: x.amount,
            description: x.description,
            type: x.type
        })
    })

    data.sort((a, b) => (new Date(b.date) - new Date(a.date)))

    const incSum = () => {
        const sum = data.reduce((pre, curr) => pre + Number(curr.amount), 0)
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

    const DeleteInc = (Id, amount, date, description, type) => {
        dispatch(deleteIncome({ "username": localStorage.getItem("username"), "incId": Id, "amount": amount, "date": date, "description": description, "type": type }))
        dispatch(getAllIncome(localStorage.getItem("username")))
        dispatch(getAllIncome(localStorage.getItem("username")))
    }

    // Click i button to see transaction information (Mobile View)
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
                <table class="table table-hover">
                    <thead>
                        <tr align="center">
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th style={{ display: isMobile ? "none" : "" }} scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => {
                                return (
                                    <tr align="center">
                                        <td>{index + 1}</td>
                                        <td>{(d.date).slice(0, 10)}</td>
                                        <td>{d.amount}</td>
                                        <td style={{ display: isMobile ? "none" : "" }}>{d.description}</td>
                                        <td>
                                            <tr>
                                                <td  style={{ paddingRight: isMobile ? 0 : 20 }}>
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
                <div><h5 style={{ marginTop: isMobile ? "10%" : "50%" }}>Income</h5></div>
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
            <FloatButton.BackTop visibilityHeight={250} style={{ right: 20, bottom: 100 }} />
        </>
    )
}
