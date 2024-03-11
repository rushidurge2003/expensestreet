import React from 'react'
import { Link } from 'react-router-dom'
import { GithubOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import icon from './images/webicon.png'

export const WelcomeNavbar = () => {

  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar bg-body-tertiary" style={{ boxShadow: "0px 15px 10px -15px #111", position: "fixed", width: "100%", zIndex: 1000, backgroundColor: "white" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: "black" }}>
            <img src={icon} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
            <b>ExpenseStreet</b>
          </Link>
          <div >
            <Button type='link' block onClick={()=>{navigate("/about")}}>About</Button>
            <Button type='text' block><GithubOutlined size={10} /></Button>
          </div>
        </div>
      </nav>
    </>
  )
}
