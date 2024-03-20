import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Button, Badge, Avatar, Drawer, Card } from 'antd'
import { UserOutlined, LogoutOutlined, MessageFilled, DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../slice/ProfileDetailSlice';
import { getNotification, getNotificationCount } from '../slice/NotificationSlice';

export const Navbar = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.NotificationSliceReducer.notificationData.data)
    const notificationCount = useSelector((state) => state.NotificationSliceReducer.notificationCount)

    useEffect(() => {
        dispatch(getNotification(localStorage.getItem("username")))
        dispatch(getNotificationCount(localStorage.getItem("username")))
    }, [])

    console.log("Notification : ", state);
    console.log("Notification Count : ", notificationCount);

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
        window.location.replace("http://localhost:3000")
    }

    return (
        <>
            <nav className="navbar bg-body-tertiary" style={{ boxShadow: "0px 15px 10px -15px #111", position: "fixed", width: "100%", zIndex: 1000, backgroundColor: "white" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: "black" }}>
                        {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/> */}
                        <b>ExpenseStreet</b>
                    </Link>
                    <div style={{ marginRight: "10px" }}>
                        <Badge count={notificationCount} style={{ marginRight: 12 }}><Button icon={<MessageFilled />} onClick={showNotiDrawer} style={{ marginRight: 14 }} type='primary' /></Badge>
                        <Button title='Logout' style={{ marginRight: "10px" }} type='primary' icon={<LogoutOutlined />} onClick={logOut} />
                        <Avatar icon={<UserOutlined />} onClick={showDrawer} />
                        <Drawer title={localStorage.getItem("username")} onClose={onClose} open={open}>
                            <div className='text-center'><Avatar icon={<UserOutlined />} size={50} onClick={showDrawer} /></div>
                            <b className='text-center'><p>{localStorage.getItem("username")}</p></b>
                            <h6><Link style={{ color: "black", textDecoration: "none" }} to="/profile" onClick={() => { dispatch(getUserDetails(localStorage.getItem("username"))) }}>Profile</Link><br /></h6>
                        </Drawer>

                        <Drawer title={"Messages"} onClose={onNotiClose} open={notiOpen}>
                            {
                                state?.map((x) => {
                                    return (
                                        <>
                                            <Card style={{
                                                width: 330,
                                                border: "1px solid gray",
                                                marginBottom: 3,
                                            }}
                                                hoverable
                                            >
                                                <b><h6 className='text-center'>{x.title}</h6></b>
                                                <div style={{ margin: 0, padding: 0 }}>
                                                    <strong>{x.type} {x.amount}</strong>
                                                    <p>Due Date : {(x.date).slice(0, 19).replace("T", ' ')}<br />{x.description}</p>
                                                </div>
                                                <div>
                                                    <Button shape='circle' danger icon={<DeleteFilled />} />
                                                </div>
                                            </Card>
                                        </>
                                    )
                                })
                            }
                        </Drawer>
                    </div>
                </div>
            </nav >
        </>
    )
}
