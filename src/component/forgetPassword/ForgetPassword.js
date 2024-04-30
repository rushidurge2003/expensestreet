import React from 'react'
import { useState } from 'react'
import { message } from 'antd'
import axios from 'axios'
import randn from 'randn'
import { useNavigate } from 'react-router-dom'
import usePreventZoom from '../usePreventZoom'
import { useMediaQuery } from 'react-responsive'

const ForgetPassword = () => {

    // usePreventZoom()
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [otp, setOtp] = useState(0)
    const [userEnterOtp, setUserEnterOtp] = useState("")
    const [generateBtnDisable, setGenerateBtnDisable] = useState(false)
    const [validateBtnDisable, setValidateBtnDisable] = useState(false)
    const [validOtp, setValidOtp] = useState(false)
    const [viewpassword, setViewpassword] = useState(false)
    const [resetPassword, setResetPassword] = useState("")
    const [resetConfirmPassword, setResetConfirmPassword] = useState("")

    const generateOtp = async (e) => {
        e.preventDefault()
        if (username === "") {
            message.warning("Please enter username")
        }
        else {
            const result = await axios.get("https://expbackend.onrender.com/userexist/" + username)
            if (result.data.exist) {
                setGenerateBtnDisable(true)
                const result1 = await axios.get("https://expbackend.onrender.com/getUserEmail/" + username)
                const OTP = randn(6)
                setOtp(OTP)
                await axios.post("https://expbackend.onrender.com/sendOtpMail", { "email": result1.data.mail, "otp": OTP })
            }
            else {
                message.error("username no exist")
            }
        }
    }

    const validateOtp = (e) => {
        e.preventDefault()
        if (otp === userEnterOtp) {
            message.success("Otp Validate Successfully")
            setValidateBtnDisable(true)
            setValidOtp(true)
        }
        else {
            message.error("Please enter valid otp")
        }
    }

    const resetPasswordFun = async (e) => {
        e.preventDefault()
        if (resetPassword === resetConfirmPassword) {
            await axios.post("https://expbackend.onrender.com/resetPassword", { "password": resetConfirmPassword, "username": username })
            message.success("Password reset successfully")
            navigate("/login")
        }
        else {
            message.error("Password and Confirm Password doesn't match")
        }
    }

    return (
        <>
            <div>
                <div style={{ width: isMobile ? "300px" : "500px", position: "absolute", left: 0, right: 0, top: 80, marginRight: "auto", marginLeft: "auto", padding: 0 }}>
                    <h2 className='text-center'>Reset Password</h2>
                    <form>
                        <div className="mb-3 row">
                            <label htmlForfor="exampleInputEmail1" className="form-label">Username</label>
                            <div className='col-md-8'>
                                <input type="username" value={username} className="form-control" id="exampleInputEmail1" onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                            <div className='col-md-4' style={{marginTop:isMobile?10:0}}>
                                <button type="submit" disabled={generateBtnDisable} className="btn btn-primary" onClick={generateOtp}>Generate Otp</button>
                            </div>
                        </div>
                        {
                            otp === 0 ?
                                "" :
                                <div className="mb-3 row">
                                    <label htmlForfor="exampleInputPassword1" className="form-label">Enter OTP</label>
                                    <div className='col-md-8'>
                                        <input type="text" value={userEnterOtp} className="form-control" id="exampleInputPassword1" onChange={(e) => { setUserEnterOtp(e.target.value) }} />
                                    </div>
                                    <div className='col-md-4' style={{marginTop:isMobile?10:0}}>
                                        <button type="submit" disabled={validateBtnDisable} className="btn btn-primary" onClick={validateOtp}>Validate Otp</button>
                                    </div>
                                </div>
                        }
                        {
                            validOtp ?
                                <>
                                    <div>
                                        <div className="mb-3">
                                            <label htmlForfor="exampleInputPassword1" className="form-label">Password</label>
                                            <input type={viewpassword ? "text" : "password"} value={resetPassword} className="form-control" id="exampleInputPassword1" onChange={(e) => { setResetPassword(e.target.value) }} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlForfor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                            <input type={viewpassword ? "text" : "password"} value={resetConfirmPassword} className="form-control" id="exampleInputPassword1" onChange={(e) => { setResetConfirmPassword(e.target.value) }} />
                                        </div>
                                        <div><input type="checkbox" checked={viewpassword} onClick={() => { setViewpassword(!viewpassword) }} /> <small>Show Password</small></div>
                                        <div className='d-flex justify-content-center'>
                                            <button type="submit" className="btn btn-primary" onClick={resetPasswordFun}>Reset</button>
                                        </div>
                                    </div>
                                </> : ""
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword
