import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import {
    Empty, Button, Tooltip, Badge, FloatButton
} from 'antd';
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    getdeleteTransData, deleteDeletedTrans, deletRestoreExpense, deleteRestoreIncome, getAllExpense,
    getAllIncome
} from '../../slice/RecordSlice';
import { useMediaQuery } from 'react-responsive'

export const DeletedTransaction = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
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
                            <th style={{ display: isMobile ? "none" : "" }} scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th style={{ display: isMobile ? "none" : "" }} scope="col">Description</th>
                            <th style={{ display: isMobile ? "none" : "" }} scope="col">Payment Mode</th>
                            <th style={{ display: isMobile ? "none" : "" }} scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            delData.map((d, index) => {
                                if (d.type === "expense") {
                                    return (
                                        <tr key={index}>
                                            <td style={{ display: isMobile ? "none" : "" }}>{index + 1}</td>
                                            <td><Badge.Ribbon text="Expense" color='red'></Badge.Ribbon></td>
                                            <td>{(d.date).slice(0, 10)}</td>
                                            <td>{d.amount}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.description}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.payment_mode}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.category}</td>
                                            <td>
                                                <tr>
                                                    <td>
                                                        <Tooltip title="Restore">
                                                            <Button type="primary" shape="circle" icon={<ReloadOutlined />}
                                                                onClick={() => {
                                                                    RestoreExpense(d.id, d.amount, (d.date).slice(0, 19).replace("T", " "), d.description, d.payment_mode, d.category)
                                                                    DeleteTrans(d.delid)
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                    <td>
                                                        <Tooltip title="Delete">
                                                            <Button type="primary" style={{ marginLeft: isMobile ? 10 : 0 }} danger shape="circle" icon={<DeleteOutlined />}
                                                                onClick={() => { DeleteTrans(d.delid) }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            </td>
                                        </tr>
                                    )
                                }
                                if (d.type === "income") {
                                    return (
                                        <tr>
                                            <td style={{ display: isMobile ? "none" : "" }}>{index + 1}</td>
                                            <td><Badge.Ribbon text="Income" color='green'></Badge.Ribbon></td>
                                            <td>{(d.date).slice(0, 10)}</td>
                                            <td>{d.amount}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>{d.description}</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>-</td>
                                            <td style={{ display: isMobile ? "none" : "" }}>-</td>
                                            <td>
                                                <tr>
                                                    <td>
                                                        <Tooltip title="Restore">
                                                            <Button type="primary" shape="circle" icon={<ReloadOutlined />}
                                                                onClick={() => {
                                                                    RestoreIncome(d.id, d.amount, (d.date).slice(0, 19).replace("T", " "), d.description)
                                                                    DeleteTrans(d.delid)
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                    <td>
                                                        <Tooltip title="Delete">
                                                            <Button type="primary" style={{ marginLeft: isMobile ? 10 : 0 }} danger shape="circle" icon={<DeleteOutlined />}
                                                                onClick={() => { DeleteTrans(d.delid) }}
                                                            />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
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
