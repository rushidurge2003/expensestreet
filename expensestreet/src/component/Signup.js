import React from 'react'
import { useState } from 'react'
import { message } from 'antd';
import { signupUser } from '../slice/SignUpSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import usePreventZoom from './usePreventZoom';

export const Signup = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, seteMail] = useState("")
    const [contact, setContact] = useState("")
    const [viewpassword, setViewPassword] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    usePreventZoom()

    const setUser = async (e) => {
        try {
            e.preventDefault();
            if (name === "" && email === "" && username === "" && password === "") {
                message.warning("Please fill all fields")
            }
            else if (name === "") {
                message.warning("Please enter Name")
            }
            else if (email === "") {
                message.warning("Please enter Email")
            }
            else if (contact === "") {
                message.warning("Please enter Contact Number")
            }
            else if (contact.length < 10) {
                message.warning("Please enter 10 digit Contact Number")
            }
            else if (username === "") {
                message.warning("Please enter Username")
            }
            else if (password === "") {
                message.warning("Please enter Password")
            }
            else {
                const result = await axios.get("http://localhost:9000/userexist/" + username)
                if (result.data.exist) {
                    message.error("Username Already Exist")
                    setUsername("")
                    setPassword("")
                }
                else {
                    dispatch(signupUser({ "name": name, "email": email, "username": username, "password": password, "contact": contact }))
                    navigate("/login")
                    message.success("Successfully Signup")
                    await axios.post("http://localhost:9000/creatDataBase", { "name": name, "email": email, "username": username, "contact": contact })
                    await axios.post("http://localhost:9000/sendMail",{"email":email})
                    setName("")
                    setUsername("")
                    setPassword("")
                    seteMail("")
                }
            }
        } catch (error) {

        }
    }

    return (
        <div style={{ position: "absolute", top: 70, left: "30%" }}>
            <div
                style={{
                    width: "500px"
                }}
            >
                <h2 className='text-center'>Signup</h2>
                <form>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" value={name} className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Mail</label>
                        <input type="email" value={email} className="form-control" id="exampleInputEmail1" onChange={(e) => { seteMail(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact</label>
                        {/* <input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress={if(this.value.length==4) return false;} /> */}
                        <input type="tel" inputMode='numeric' value={contact} maxLength='10' pattern="[0-9]{10}" className="form-control" onChange={(e) => { setContact(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Username</label>
                        <input type="text" value={username} className="form-control" id="username" onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type={viewpassword ? "text" : "password"} value={password} className="form-control" id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} />
                        <div><input type="checkbox" checked={viewpassword} onClick={() => { setViewPassword(!viewpassword) }} /> <small>Show Password</small></div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div style={{ margin: "auto" }}>
                            <button type="submit" className="btn btn-primary" onClick={setUser}>Sign up</button>
                        </div>
                    </div>
                </form>
                <div>
                    <div className='text-center' style={{ marginTop: '5%' }}>
                        Already have an account <Link to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
