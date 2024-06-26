import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backDisplayInevstment } from '../../slice/InvestmentSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker, message, Badge, FloatButton
} from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { getRealEstateInvest, addRealEstateInvest, updateRealEstateInvest, deleteRealEstateInvest } from '../../slice/InvestmentSlice';
import { useMediaQuery } from 'react-responsive';

export const RealEstate = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

    const date = new Date()

    useEffect(() => {
        getRealEstateData()
    }, [])
    const getRealEstateData = () => {
        dispatch(getRealEstateInvest(localStorage.getItem("username")))
    }

    const [id, setId] = useState(null)
    const [mfdate, setMfDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [mfName, setMfName] = useState("")
    const [amount, setAmount] = useState(0)

    const dispatch = useDispatch()
    const state = useSelector((state) => state.InvestmentSliceReducer.realEstateData.data)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Add Modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (mfName === "") {
            message.warning("Please enter stock name")
        }
        else if (amount <= 0) {
            message.warning("Please enter stock price")
        }
        else {
            setIsModalOpen(false);
            dispatch(addRealEstateInvest({
                "username": localStorage.getItem("username"),
                "date": mfdate + ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                "name": mfName, "amount": amount
            }))
            dispatch(getRealEstateInvest(localStorage.getItem("username")))
            dispatch(getRealEstateInvest(localStorage.getItem("username")))
            message.success("Stock Investment add successfully")
            setMfDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setMfName("")
            setAmount(0)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Update Modal
    const showUpdateModal = (mdate, mname, mamount) => {
        setIsUpdateModalOpen(true);
        setMfDate(mdate)
        setMfName(mname)
        setAmount(mamount)
    };
    const handleUpdateOk = () => {
        if (mfName === "") {
            message.warning("Please enter stock name")
        }
        else if (amount <= 0) {
            message.warning("Please enter stock price")
        }
        else {
            setIsUpdateModalOpen(false);
            dispatch(updateRealEstateInvest({
                "username": localStorage.getItem("username"), "id": id,
                "date": (mfdate).slice(0, 19).replace("T", ' '),
                "name": mfName, "amount": amount
            }))
            dispatch(getRealEstateInvest(localStorage.getItem("username")))
            dispatch(getRealEstateInvest(localStorage.getItem("username")))
            message.success("Stock Investment add successfully")
            setMfDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setMfName("")
            setAmount(0)
        }
    };
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false);
        setMfDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setMfName("")
        setAmount(0)
    };

    const realEstateSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        state?.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const displayRealEstateInvest = () => {
        return (
            <>
                <Card bordered={false}>
                    <Statistic
                        title="Stock Investment"
                        value={
                            realEstateSum()
                            // 12
                        }
                        precision={2}
                        valueStyle={{
                            color: 'black',
                        }}
                        // prefix={<ArrowUpOutlined />}
                        suffix="₹"
                    />
                </Card>
            </>
        )
    }

    const displayRealEstateData = () => {
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">RE Name</th>
                            <th scope="col">Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.map((x, index) => {
                                return (
                                    <tr key={index} align="center">
                                        <td>{index + 1}</td>
                                        <td>{(x.rdate).slice(0, 10)}</td>
                                        <td>{x.rname}</td>
                                        <td>{x.amount}</td>
                                        <td>
                                            <tr>
                                                <td style={{ paddingRight: isMobile ? 10 : 0 }}>
                                                    <Tooltip title="Edit">
                                                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                            onClick={() => {
                                                                showUpdateModal(x.rdate, x.rname, x.amount)
                                                                setId(x.rid)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </td>
                                                <td style={{ marginLeft: isMobile ? 10 : 0 }}>
                                                    <Tooltip title="Delete">
                                                        <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                            onClick={() => { deleteRealEstateData(x.rid) }}
                                                        />
                                                    </Tooltip>
                                                </td>
                                            </tr>
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

    const deleteRealEstateData = (id) => {
        dispatch(deleteRealEstateInvest({ "username": localStorage.getItem("username"), "id": id }))
        dispatch(getRealEstateInvest(localStorage.getItem("username")))
        dispatch(getRealEstateInvest(localStorage.getItem("username")))
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between' style={{ marginTop: isMobile ? 10 : 50 }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backDisplayInevstment()) }} />
                    <div style={{ marginLeft: 10 }}><h5>Real Estate</h5></div>
                </div>
                <div style={{ display: isMobile ? "none" : "" }}>
                    {displayRealEstateInvest()}
                </div>
                <div style={{ marginTop: isMobile ? 10 : 30 }}>
                    <Button onClick={showModal} icon={<PlusOutlined />} />
                </div>
            </div>
            {state?.length === 0 ? <Empty style={{ position: "relative", top: 100 }} /> : displayRealEstateData()}

            <Modal width={500} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Date">
                        <DatePicker value={dayjs(mfdate)} onChange={(_, strDate) => setMfDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="RE Name">
                        <Input value={mfName} onChange={(e) => setMfName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Input value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal width={500} title="Basic Modal" open={isUpdateModalOpen} onOk={handleUpdateOk} onCancel={handleUpdateCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Date">
                        <DatePicker value={dayjs(mfdate)} onChange={(_, strDate) => setMfDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="RE Name">
                        <Input value={mfName} onChange={(e) => setMfName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Amount">
                        <Input value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
