import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {
    Empty, Button, Tooltip, Badge,FloatButton
} from 'antd';
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    getdeleteTransData, deleteDeletedTrans, deletRestoreExpense, deleteRestoreIncome, getAllExpense,
    getAllIncome
} from '../../slice/RecordSlice';

export const DeletedTransaction = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getdeleteTransData(localStorage.getItem("username")))
    })

    const delState = useSelector((state) => state.RecordSliceReducer.deleteTransData)


    const delData = delState.map((x) => {
        return ({
            delid: x.deletePermantID,
            id: x.deleteId,
            // date: (x.date).slice(0, 19).replace('T', ' '),
            date: x.date,
            amount: x.amount,
            description: x.description,
            payment_mode: x.payment_mode,
            category: x.category,
            type: x.type
        })
    })

    const DeleteTrans = (delId) => {
        dispatch(deleteDeletedTrans({ "username": localStorage.getItem("username"), "delId": delId }))
        dispatch(getAllExpense(localStorage.getItem("username")))
        dispatch(getAllIncome(localStorage.getItem("username")))
    }

    const RestoreIncome = (incId, amount, date, description) => {
        const username = localStorage.getItem("username")
        dispatch(deleteRestoreIncome({ "username": username, "incId": incId, "amount": amount, "date": date, "description": description }))
        // dispatch(getAllIncome(localStorage.getItem("username")))
    }

    const RestoreExpense = (expId, amount, date, description, payment_mode, category) => {
        const username = localStorage.getItem("username")
        dispatch(deletRestoreExpense({ "username": username, "expId": expId, "amount": amount, "date": date, "description": description, "payment_mode": payment_mode, "category": category }))
        // dispatch(getAllExpense(localStorage.getItem("username")))
    }

    const dataTable = () => {
        return (
            <>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Description</th>
                            <th scope="col">Payment Mode</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            delData.map((d, index) => {
                                if (d.type === "expense") {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Badge.Ribbon text="Income" color='red'></Badge.Ribbon></td>
                                            <td>{(d.date).slice(0, 10)}</td>
                                            <td>{d.amount}</td>
                                            <td>{d.description}</td>
                                            <td>{d.payment_mode}</td>
                                            <td>{d.category}</td>
                                            <td className='d-flex justify-content-evenly'>
                                                <Tooltip title="Restore">
                                                    <Button type="primary" shape="circle" icon={<ReloadOutlined />}
                                                        onClick={() => {
                                                            RestoreExpense(d.id, d.amount, (d.date).slice(0, 19).replace("T", " "), d.description, d.payment_mode, d.category)
                                                            DeleteTrans(d.delid)
                                                        }}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                        onClick={() => { DeleteTrans(d.delid) }}
                                                    />
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    )
                                }
                                if (d.type === "income") {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><Badge.Ribbon text="Income" color='green'></Badge.Ribbon></td>
                                            <td>{(d.date).slice(0, 10)}</td>
                                            <td>{d.amount}</td>
                                            <td>{d.description}</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td className='d-flex justify-content-evenly'>
                                                <Tooltip title="Restore">
                                                    <Button type="primary" shape="circle" icon={<ReloadOutlined />}
                                                        onClick={() => {
                                                            RestoreIncome(d.id, d.amount, (d.date).slice(0, 19).replace("T", " "), d.description)
                                                            DeleteTrans(d.delid)
                                                        }}
                                                    />
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                                        onClick={() => { DeleteTrans(d.delid) }}
                                                    />
                                                </Tooltip>
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

    return (
        <>
            <div className='d-flex justify-content-between'>
                <div><h5>Deleted Transaction</h5></div>
            </div>
            {
                delData.length === 0 ? <div style={{ marginTop: 50 }}>< Empty /></div> : dataTable()
            }
            <FloatButton.BackTop visibilityHeight={250} style={{ right: 20, bottom: 100 }} />
        </>
    )
}
