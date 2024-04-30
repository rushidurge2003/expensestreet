import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button, Badge, Avatar, Drawer, Modal, Popconfirm, message } from 'antd'
import { UserOutlined, LogoutOutlined, MessageFilled, CalculatorOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../slice/ProfileDetailSlice';
import { getNotification, getNotificationCount } from '../slice/NotificationSlice';

export const Navbar = () => {

    const [nData, setNData] = useState([])

    const dispatch = useDispatch()
    const state = useSelector((state) => state.NotificationSliceReducer.notificationData.data)
    const notificationCount = useSelector((state) => state.NotificationSliceReducer.notificationCount)

    useEffect(() => {
        dispatch(getNotification(localStorage.getItem("username")))
        dispatch(getNotificationCount(localStorage.getItem("username")))
        setNData(state)
    }, [nData])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // setInterval(() => {
    //     dispatch(getNotification(localStorage.getItem("username")))
    //     dispatch(getNotificationCount(localStorage.getItem("username")))
    // }, 20000)

    // console.log("Notification : ", state);
    // console.log("Notification Count : ", notificationCount);

    const [open, setOpen] = useState(false);
    const [notiOpen, setNotiOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const showNotiDrawer = () => {
        setNotiOpen(true);
    };
    const onNotiClose = () => {
        setNotiOpen(false);
    };

    const logOut = () => {
        localStorage.setItem("isAuthenticated", "false")
        localStorage.setItem("username", "")
        window.location.replace("https://expensestreet.netlify.app")
    }

    const confirm = (e) => {
        message.success('Logout');
        logOut()
    };
    const cancel = (e) => {
        message.error('Cancel to Logout');
    };

    const notiData = state?.map((x) => { return ({ ...x }) })

    notiData?.sort((a, b) => (new Date(b.notificationId) - new Date(a.notificationId)))

    return (
        <>
            <nav className="navbar bg-body-tertiary" style={{ boxShadow: "0px 15px 10px -15px #111", position: "fixed", width: "100%", zIndex: 1000, backgroundColor: "white" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: "black" }}>
                        {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/> */}
                        <b>ExpenseStreet</b>
                    </Link>
                    <div style={{ marginRight: "10px" }}>
                        <Button title='Calculator' style={{ marginRight: "10px" }} type='primary' icon={<CalculatorOutlined />} onClick={showModal} />
                        <Badge count={notificationCount} style={{ marginRight: 12 }}><Button icon={<MessageFilled />} onClick={showNotiDrawer} style={{ marginRight: 14 }} type='primary' /></Badge>
                        {/* <Button title='Logout' style={{ marginRight: "10px" }} type='primary' icon={<LogoutOutlined />} onClick={logOut} /> */}
                        <Popconfirm
                            title="Logout"
                            description="Are you sure to logout?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="Cancel"
                        >
                            <Button title='Logout' style={{ marginRight: "10px" }} type='primary' icon={<LogoutOutlined />} />
                        </Popconfirm>
                        <Avatar icon={<UserOutlined />} onClick={showDrawer} />
                        <Drawer title={localStorage.getItem("username")} onClose={onClose} open={open}>
                            <div className='text-center'><Avatar icon={<UserOutlined />} size={50} onClick={showDrawer} /></div>
                            <b className='text-center'><p>{localStorage.getItem("username")}</p></b>
                            <h6><Link style={{ color: "black", textDecoration: "none" }} to="/profile" onClick={() => { dispatch(getUserDetails(localStorage.getItem("username"))); onClose() }}>Profile</Link><br /></h6>
                            <h6><Link style={{ color: "black", textDecoration: "none" }} to="/feedback" onClick={onClose}>Feedback</Link></h6>
                        </Drawer>

                        <Drawer title={"Messages"} onClose={onNotiClose} open={notiOpen}>
                            {
                                notiData?.map((x) => {
                                    return (
                                        <>
                                            <div class="card mb-2">
                                                <div class="card-body">
                                                    <h5 class="card-title">{x.title} - {x.type} {x.amount} ₹</h5>
                                                    <div class="mb-2">
                                                        <p class="card-text"></p>{x.description}
                                                        <p class="card-text">Due Date : {(x.date).slice(0, 10)}</p>
                                                    </div>
                                                    <button className='btn btn-primary btn-sm'>Read</button>
                                                    <button className='btn btn-danger btn-sm mx-2'>Delete</button>
                                                    <button className='btn btn-success btn-sm'>Done</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </Drawer>
                    </div>
                    <Modal title="Calculator" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <strong>Calculaor add in next update</strong>
                    </Modal>
                </div>
            </nav >
        </>
    )
}
