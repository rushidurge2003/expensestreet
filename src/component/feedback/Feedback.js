import React, { useState } from 'react'
import usePreventZoom from '../usePreventZoom';
import { Input, Form, Button, message, Result } from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

export const Feedback = () => {
    usePreventZoom()
    const date = new Date()
    const navigate = useNavigate()

    const [subject, setSubject] = useState("")
    const [fback, setFback] = useState("")
    const [toggle, setToggle] = useState(true)

    const submitfback = async () => {
        if (subject === "") {
            message.warning("Please enter subject")
        }
        else if (fback === "") {
            message.warning("Please enter feedback")
        }
        else {
            const result = await axios.get("https://expbackend.onrender.com/getUserEmail/" + localStorage.getItem("username"))
            await axios.post("https://expbackend.onrender.com/feedback", {
                "username": localStorage.getItem("username"),
                "email": result.data.mail,
                "subject": subject,
                "fback": fback,
                "date": `${date.getFullYear()}-${1 + date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            })
            setToggle(false)
            setSubject("")
            setFback("")
        }
    }

    return (
        <div className='container' style={{ position: 'relative', top: 70, display: "flex", justifyContent: "center" }}>
            {toggle ?
                <div style={{
                    width: 500,
                }}>
                    <h2 className='text-center'>Feedback</h2>
                    <div>
                        <Form
                            layout="vertical"
                        >
                            <Form.Item label="Subject">
                                <Input value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                            </Form.Item>
                            <Form.Item label="Feedback">
                                <TextArea value={fback} onChange={(e) => { setFback(e.target.value) }} rows={4} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <Button type='primary' onClick={submitfback}>Submit</Button>
                    </div>
                </div>
                :
                <Result
                    status="success"
                    title="Feedback Successfully Submited"
                    // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button type="primary" onClick={()=>{navigate("/")}}> Home </Button>,
                        <Button onClick={()=>{setToggle(true)}}>Feedback</Button>,
                    ]}
                />
            }
        </div>
    )
}
