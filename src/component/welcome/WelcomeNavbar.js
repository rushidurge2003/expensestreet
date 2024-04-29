import React from 'react'
import { Link } from 'react-router-dom'
import { GithubOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const WelcomeNavbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ boxShadow: "0px 15px 10px -15px #111", position: "fixed", width: "100%", zIndex: 1000, backgroundColor: "white" }}>
        <div className="container-fluid">
          <div>
            <Link className="navbar-brand" to="/" style={{ color: "black" }}> <b>ExpenseStreet</b></Link>
            <Button type='text' style={{ paddingTop: 8 }} onClick={() => { navigate("/about") }}><strong style={{ color: "black" }}>About</strong></Button>
            <Link className='btn btn-light btn-sm mx-2 my-1' target='blank' to="https://github.com/rushidurge2003"><GithubOutlined size={10} /></Link>
          </div>
          <div>
            <Link className='btn btn-dark btn-sm mx-2' to="/login">Login</Link>
            <Link className='btn btn-dark btn-sm' to="/signup">Sign Up</Link>
          </div>

        </div>
      </nav>
    </>
  )
}
