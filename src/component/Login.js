import React from 'react'
import { useState } from 'react'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import usePreventZoom from './usePreventZoom'
import { Loading } from './loading/Loading'

export const Login = () => {
  usePreventZoom()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [viewpassword, setViewPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  const LoginProceed = async (e) => {
    try {
      e.preventDefault();
      if (username === "" && password === "") {
        message.warning("Please fill all fields")
      }
      else if (username === "") {
        message.warning("Please enter username")
      }
      else if (password === "") {
        message.warning("Please enter password")
      }
      else {
        // dispatch(LoginUser({ username: username, password: password }))
        setLoading(true)
        console.log("Username : ", username);
        console.log("Password : ", password);
        const result = await axios.post("https://expbackend.onrender.com/login", { "username": username, "password": password })
        console.log("Login Status : ", result)
        setUsername("")
        setPassword("")
        if (result.data.isAuthenticated) {
          localStorage.setItem("isAuthenticated", String(result.data.isAuthenticated))
          localStorage.setItem("username", username)
          message.success("Successfully Login")
          navigate("/")
          window.location.reload()
        }
        else {
          message.error("Failed to Login")
        }
        setLoading(false)
      }
    } catch (error) {

    }
  }

  if (loading) {
    return (<Loading />)
  }


  return (
    <div style={{ position: "absolute", top: 80, left: "30%" }}>
      <div style={{ width: "500px" }}>
        <h2 className='text-center'>Login</h2>
        <form>
          <div className="mb-3">
            <label htmlForfor="exampleInputEmail1" className="form-label">Username</label>
            <input type="username" value={username} className="form-control" id="exampleInputEmail1" onChange={(e) => { setUsername(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label htmlForfor="exampleInputPassword1" className="form-label">Password</label>
            <input type={viewpassword ? "text" : "password"} value={password} className="form-control" id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className='mb-3 d-flex justify-content-between'>
            <div><input type="checkbox" checked={viewpassword} onClick={() => { setViewPassword(!viewpassword) }} /> <small>Show Password</small></div>
            <div><Link to="/forgetpassword">forget password</Link></div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={LoginProceed}>Login</button>
        </form>
        <div>
          <div className='text-center' style={{ marginTop: '10%' }}>Don't have an account ?<Link to="/signup">Sign Up</Link></div>
        </div>
      </div>
    </div >
  )
}
