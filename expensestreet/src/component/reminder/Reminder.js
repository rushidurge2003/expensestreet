import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import {
    Form, TimePicker, Modal, Input, Select,
    DatePicker, Card, message, Button, Col, Row
} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { addReminder, getReminderData } from '../../slice/ReminderSlice';

export const Reminder = () => {
    const date = new Date()
    const [remData, setRemData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const state = useSelector((state) => state.ReminderSliceReducer.reminderData.data)
    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getReminderData(localStorage.getItem("username")))
    }



    const [remDesc, setRemDesc] = useState("")
    const [remTime, setRemTime] = useState("")
    const [remDate, setRemDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState("")


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        const username = localStorage.getItem("username")
        dispatch(addReminder({ "username": username, "desc": remDesc, "datetime": remDate + " " + remTime, "amount": amount, "type": type }))
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    // const data = state.map((x)=>{return({...x})})

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div><h5>Reminder</h5></div>
                <Button onClick={showModal} icon={<PlusOutlined />} />
            </div>
            <div>
                <Row gutter={16}>
                    {
                        state.map((x,index) => {
                            return (
                                <Col span={4} key={index}>
                                    <Card className='my-2' title={x.reminderDesc} bordered={true} hoverable style={{ width: 160,height:180 }}>
                                        <p>{(x.reminderDateTime).slice(0,19).replace("T"," ")}</p>
                                        <p>{x.type} : <strong>{x.amount}</strong></p>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>

            <Modal title="Add Reminder" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Date">
                        <DatePicker minDate={dayjs(remDate)} defaultValue={dayjs(remDate)} onChange={(_, strDate) => setRemDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Time">
                        <TimePicker defaultValue={dayjs('00:00', "HH:mm")} format="HH:mm" onChange={(time, timestr) => { setRemTime(timestr) }} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input value={remDesc} onChange={(e) => setRemDesc(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Type">
                        <Select value={type} onChange={(_, opt) => setType(opt.value)}>
                            <Select.Option value="Pay">Pay</Select.Option>
                            <Select.Option value="Recive">Recive</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
