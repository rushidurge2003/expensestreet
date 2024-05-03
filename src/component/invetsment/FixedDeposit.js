import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backDisplayInevstment } from '../../slice/InvestmentSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker, message, Badge, FloatButton
} from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { addFixedDepositInvest, getFixedDepositInvest, updateFixedDepositInvest, deleteFixedDepositInvest } from '../../slice/InvestmentSlice';
import { useMediaQuery } from 'react-responsive';

export const FixedDeposit = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

    const date = new Date()

    useEffect(() => {
        getFixedDepositData()
    }, [])
    const getFixedDepositData = () => {
        dispatch(getFixedDepositInvest(localStorage.getItem("username")))
    }

    const [id, setId] = useState(null)
    const [mfdate, setMfDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [mfName, setMfName] = useState("")
    const [amount, setAmount] = useState(0)

    const dispatch = useDispatch()
    const state = useSelector((state) => state.InvestmentSliceReducer.fixedDepositData.data)

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
            dispatch(addFixedDepositInvest({
                "username": localStorage.getItem("username"),
                "date": mfdate + ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                "name": mfName, "amount": amount
            }))
            dispatch(getFixedDepositInvest(localStorage.getItem("username")))
            dispatch(getFixedDepositInvest(localStorage.getItem("username")))
            message.success("Fixed Deposite Investment add successfully")
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
            dispatch(updateFixedDepositInvest({
                "username": localStorage.getItem("username"), "id": id,
                "date": (mfdate).slice(0, 19).replace("T", ' '),
                "name": mfName, "amount": amount
            }))
            dispatch(getFixedDepositInvest(localStorage.getItem("username")))
            dispatch(getFixedDepositInvest(localStorage.getItem("username")))
            message.success("Fixed Deposit Investment add successfully")
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

    const fixedDepositSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        state?.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const displayFixedDepositInvest = () => {
        return (
            <>
                <Card bordered={false}>
                    <Statistic
                        title="Stock Investment"
                        value={
                            fixedDepositSum()
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

    const displayFixedDepositData = () => {
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">MF Name</th>
                            <th scope="col">Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{(x.fdate).slice(0, 10)}</td>
                                        <td>{x.bankname}</td>
                                        <td>{x.amount}</td>
                                        <td>
                                            <tr>
                                                <td style={{ paddingRight: isMobile ? 10 : 0 }}>
                                                    <Tooltip title="Edit">
                                                        <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                            onClick={() => {
                                                                showUpdateModal(x.fdate, x.bankname, x.amount)
                                                                setId(x.fid)
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </td>
                                                <td>
                                                    <Tooltip title="Delete">
                                                        <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                            onClick={() => { deleteFixedDepositData(x.fid) }}
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

    const deleteFixedDepositData = (id) => {
        dispatch(deleteFixedDepositInvest({ "username": localStorage.getItem("username"), "id": id }))
        dispatch(getFixedDepositInvest(localStorage.getItem("username")))
        dispatch(getFixedDepositInvest(localStorage.getItem("username")))
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between' style={{ marginTop: isMobile ? 10 : 50 }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backDisplayInevstment()) }} />
                    <div style={{ marginLeft: 10 }}><h5>Fixed Deposit</h5></div>
                </div>
                <div style={{ display: isMobile ? "none" : "" }}>
                    {displayFixedDepositInvest()}
                </div>
                <div style={{ marginTop: isMobile ? 10 : 30 }}>
                    <Button onClick={showModal} icon={<PlusOutlined />} />
                </div>
            </div>
            {state?.length === 0 ? <Empty style={{ position: "relative", top: 100 }} /> : displayFixedDepositData()}

            <Modal width={500} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Date">
                        <DatePicker value={dayjs(mfdate)} onChange={(_, strDate) => setMfDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Bank Name">
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
                    <Form.Item label="Bank Name">
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
