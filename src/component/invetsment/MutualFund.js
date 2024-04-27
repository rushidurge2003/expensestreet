import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backDisplayInevstment } from '../../slice/InvestmentSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker, message, Badge, FloatButton
} from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { addMutualFundInvest, getMutualFundInvest, updateMutualFundInvest, deleteMutualFundInvest } from '../../slice/InvestmentSlice';

export const MutualFund = () => {

    const date = new Date()

    useEffect(() => {
        getMutulaFundData()
    }, [])
    const getMutulaFundData = () => {
        dispatch(getMutualFundInvest(localStorage.getItem("username")))
    }

    const [id, setId] = useState(null)
    const [mfdate, setMfDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [mfName, setMfName] = useState("")
    const [amount, setAmount] = useState(0)

    const dispatch = useDispatch()
    const state = useSelector((state) => state.InvestmentSliceReducer.mutulaFundData.data)

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
            dispatch(addMutualFundInvest({
                "username": localStorage.getItem("username"),
                "date": mfdate + ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                "name": mfName, "amount": amount
            }))
            dispatch(getMutualFundInvest(localStorage.getItem("username")))
            dispatch(getMutualFundInvest(localStorage.getItem("username")))
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
            dispatch(updateMutualFundInvest({
                "username": localStorage.getItem("username"), "id": id,
                "date": (mfdate).slice(0,19).replace("T",' '),
                "name": mfName, "amount": amount
            }))
            dispatch(getMutualFundInvest(localStorage.getItem("username")))
            dispatch(getMutualFundInvest(localStorage.getItem("username")))
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

    const mutualFundSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        state?.forEach(element => {
            sum += element.amount
        });
        return sum
    }

    const displayMutualFundInvest = () => {
        return (
            <>
                <Card bordered={false}>
                    <Statistic
                        title="Stock Investment"
                        value={
                            mutualFundSum()
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

    const displayMutulaFundData = () => {
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
                                        <td>{(x.mfdate).slice(0, 10)}</td>
                                        <td>{x.mfname}</td>
                                        <td>{x.amount}</td>
                                        <td className='d-flex justify-content-evenly'>
                                            <Tooltip title="Edit">
                                                <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                    onClick={() => {
                                                        showUpdateModal(x.mfdate, x.mfname, x.amount)
                                                        setId(x.mfid)
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                    onClick={() => { deleteMFData(x.mfid) }}
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

    const deleteMFData = (id) => {
        dispatch(deleteMutualFundInvest({ "username": localStorage.getItem("username"), "id": id }))
        dispatch(getMutualFundInvest(localStorage.getItem("username")))
        dispatch(getMutualFundInvest(localStorage.getItem("username")))
    }

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between' style={{ marginTop: 50 }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backDisplayInevstment()) }} />
                    <div style={{ marginLeft: 10 }}><h5>Mutual Fund</h5></div>
                </div>
                <div>
                    {displayMutualFundInvest()}
                </div>
                <div style={{ marginTop: 30 }}>
                    <Button onClick={showModal} icon={<PlusOutlined />} />
                </div>
            </div>
            {state?.length === 0 ? <Empty style={{ position: "relative", top: 100 }} /> : displayMutulaFundData()}

            <Modal width={500} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Date">
                        <DatePicker value={dayjs(mfdate)} onChange={(_, strDate) => setMfDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Mutual Fund Name">
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
                    <Form.Item label="Mutual Fund Name">
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
