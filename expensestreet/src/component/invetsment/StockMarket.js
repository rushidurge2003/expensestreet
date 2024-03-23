import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backDisplayInevstment } from '../../slice/InvestmentSlice'
import dayjs from 'dayjs'
import {
    Empty, Card, Statistic, Button, Tooltip,
    Form, Modal, Input, DatePicker, message, Badge, FloatButton
} from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { addStockInvest, getStockInvest, updateStockInvest, deleteStockInvest } from '../../slice/InvestmentSlice';

export const StockMarket = () => {

    const date = new Date()

    useEffect(() => {
        getStockData()
    }, [])

    const [id, setId] = useState(null)
    const [stdate, setStDate] = useState(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    const [stockName, setStockName] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const dispatch = useDispatch()
    const state = useSelector((state) => state.InvestmentSliceReducer.stockData.data)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (stockName === "") {
            message.warning("Please enter stock name")
        }
        else if (price <= 0) {
            message.warning("Please enter stock price")
        }
        else if (quantity <= 0) {
            message.warning("Please enter stock quantity")
        }
        else {
            setIsModalOpen(false);
            dispatch(addStockInvest({
                "username": localStorage.getItem("username"),
                "date": stdate + ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                "name": stockName, "price": price, "quantitiy": quantity, "total": price * quantity
            }))
            dispatch(getStockInvest(localStorage.getItem("username")))
            dispatch(getStockInvest(localStorage.getItem("username")))
            message.success("Stock Investment add successfully")
            setStDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setStockName("")
            setPrice(0)
            setQuantity(0)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showUpdateModal = (sdate, stname, stprice, stquantity) => {
        setIsUpdateModalOpen(true)
        setStDate(sdate)
        setStockName(stname)
        setPrice(stprice)
        setQuantity(stquantity)
    }
    const handleUpdateOk = () => {
        if (stockName === "") {
            message.warning("Please enter stock name")
        }
        else if (price <= 0) {
            message.warning("Please enter stock price")
        }
        else if (quantity <= 0) {
            message.warning("Please enter stock quantity")
        }
        else {
            setIsUpdateModalOpen(false);
            dispatch(updateStockInvest({
                "username": localStorage.getItem("username"), "id": id,
                "date": (stdate).slice(0,19).replace("T",' '),
                "name": stockName, "price": price, "quantity": quantity, "total": price * quantity
            }))
            dispatch(getStockInvest(localStorage.getItem("username")))
            dispatch(getStockInvest(localStorage.getItem("username")))
            message.success("Stock Investment update successfully")
            setStDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
            setStockName("")
            setPrice(0)
            setQuantity(0)
        }
    };
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false);
        setStDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setStockName("")
        setPrice(0)
        setQuantity(0)
    };

    const stockSum = () => {
        // const sum = state.reduce((pre, curr) => pre + Number(curr.total), 0)
        let sum = 0;
        state?.forEach(element => {
            sum += element.total
        });
        return sum
    }

    const getStockData = () => {
        dispatch(getStockInvest(localStorage.getItem("username")))
    }

    const displayStockInvest = () => {
        return (
            <>
                <Card bordered={false}>
                    <Statistic
                        title="Stock Investment"
                        value={
                            stockSum()
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

    const deleteStockData = (id) => {
        dispatch(deleteStockInvest({ "username": localStorage.getItem("username"), "id": id }))
        dispatch(getStockInvest(localStorage.getItem("username")))
        dispatch(getStockInvest(localStorage.getItem("username")))
    }

    const displayStockData = () => {
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Stock Name</th>
                            <th scope="col">Stock Price</th>
                            <th scope="col">Stock Quantitiy</th>
                            <th scope="col">Total</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{(x.smdate).slice(0, 10)}</td>
                                        <td>{x.smname}</td>
                                        <td>{x.price}</td>
                                        <td>{x.quantity}</td>
                                        <td>{x.total}</td>
                                        <td className='d-flex justify-content-evenly'>
                                            <Tooltip title="Edit">
                                                <Button type="primary" shape="circle" icon={<EditOutlined />}
                                                    onClick={() => {
                                                        showUpdateModal(x.smdate, x.smname, x.price, x.quantity)
                                                        setId(x.smid)
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                    onClick={() => { deleteStockData(x.smid) }}
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
                <div className='d-flex justify-content-between' style={{ marginTop: 50 }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => { dispatch(backDisplayInevstment()) }} />
                    <div style={{ marginLeft: 10 }}><h5>Stock Market</h5></div>
                </div>
                <div>
                    {displayStockInvest()}
                </div>
                <div style={{ marginTop: 30 }}>
                    <Button onClick={showModal} icon={<PlusOutlined />} />
                </div>
            </div>
            {state?.length === 0 ? <Empty style={{ position: "relative", top: 100 }} /> : displayStockData()}
            <Modal width={500} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    layout="horizontal"
                >
                    <Form.Item label="Date">
                        <DatePicker value={dayjs(stdate)} onChange={(_, strDate) => setStDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Stock Name">
                        <Input value={stockName} onChange={(e) => setStockName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Total">
                        {price * quantity}
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
                        <DatePicker value={dayjs(stdate)} onChange={(_, strDate) => setStDate(strDate)} />
                    </Form.Item>
                    <Form.Item label="Stock Name">
                        <Input value={stockName} onChange={(e) => setStockName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Input value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Total">
                        {price * quantity}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
