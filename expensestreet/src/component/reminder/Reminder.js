import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import {
    Form, TimePicker, Modal, Input, Select,
    DatePicker, message, Button, Empty, FloatButton, Tooltip
} from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { addReminder, getReminderData, deleteReminder, statusTrueReminder } from '../../slice/ReminderSlice';
import success from './images/success.png'
import proccessing from './images/proccessing.png'

export const Reminder = () => {
    const date = new Date()
    const [currentTime, setCurrentTime] = useState(`0${date.getHours()}:0${date.getMinutes()}`)

    useEffect(() => {
        getData()
    }, [])

    const state = useSelector((state) => state.ReminderSliceReducer.reminderData.data)
    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getReminderData(localStorage.getItem("username")))
    }

    const [remDesc, setRemDesc] = useState("")
    const [remTime, setRemTime] = useState("00:00")
    const [remDate, setRemDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState("")
    const [dateRange, setDateRange] = useState(`${date.getFullYear()}/0${date.getMonth() + 1}`)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setIsModalOpen(false);
        const username = localStorage.getItem("username")
        dispatch(addReminder({ "username": username, "desc": remDesc, "datetime": remDate + " " + remTime, "amount": amount, "type": type }))
        dispatch(getReminderData(localStorage.getItem("username")))
        dispatch(getReminderData(localStorage.getItem("username")))
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const displayData = state?.filter((x) => {
        if ((x.reminderDateTime).slice(0, 7).replace("-", "/") === dateRange) {
            return ({ ...x })
        }
    })

    const delteRem = (id) => {
        dispatch(deleteReminder({ "username": localStorage.getItem("username"), "id": id }))
        dispatch(getReminderData(localStorage.getItem("username")))
        dispatch(getReminderData(localStorage.getItem("username")))
    }

    const statusTrueRem = (id) => {
        dispatch(statusTrueReminder({ "username": localStorage.getItem("username"), "id": id }))
        dispatch(getReminderData(localStorage.getItem("username")))
        dispatch(getReminderData(localStorage.getItem("username")))
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div><h5>Reminder</h5></div>
                <DatePicker minDate={dayjs("2023/12")} defaultValue={dayjs(dateRange, "YYYY/MM")} format={"YYYY/MM"} onChange={(_, strDate) => setDateRange(strDate)} picker="month" />
                <Button onClick={showModal} icon={<PlusOutlined />} />
            </div>
            <div style={{ marginTop: 35 }}>
                {
                    displayData?.length > 0 ?
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    displayData?.map((x, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><img src={x.reminderComplete === "true" ? success : proccessing} title={x.reminderComplete === "true" ? "Complete" : "Not Cpmlete"} width={30} /></td>
                                                <td>{(x.reminderDateTime).slice(0, 10)}</td>
                                                <td>{(x.reminderDateTime).slice(11, 16)}</td>
                                                <td>{x.reminderDesc}</td>
                                                <td>{x.type}</td>
                                                <td>{x.amount}</td>
                                                <td className='d-flex justify-content-evenly'>
                                                    <Tooltip title="Edit">
                                                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                            onClick={() => {
                                                                // showModalIncome(d.amount, d.date, d.description)
                                                                // setIncId(d.id)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Complete">
                                                        <Button type="primary" success shape="circle" icon={<CheckOutlined />}
                                                            onClick={() => { statusTrueRem(x.reminderId) }}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                            onClick={() => { delteRem(x.reminderId) }}
                                                        />
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> :
                        <Empty style={{ position: "relative", top: 120 }} />
                }

            </div >

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
                        <TimePicker defaultValue={dayjs(remTime, "HH:mm")} format="HH:mm" onChange={(time, timestr) => { setRemTime(timestr) }} />
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
            <FloatButton.BackTop visibilityHeight={250} style={{ right: 20, bottom: 100 }} />
        </>
    )
}