import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GithubOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export const WelcomeNavbar = () => {

  const isBreak = useMediaQuery({ query: '(max-width: 900px)' })

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ boxShadow: "0px 15px 10px -15px #111", position: "fixed", width: "100%", zIndex: 1000, backgroundColor: "white" }}>
        <div className="container-fluid">
          <div>
            <Link className="navbar-brand" to="/" style={{ color: "black" }}> <b>ExpenseStreet</b></Link>
            <Button type='text' style={{ paddingTop: 8, display: isBreak ? "none" : "" }} onClick={() => { navigate("/about") }}><strong style={{ color: "black" }}>About</strong></Button>
            <Link className='btn btn-light btn-sm mx-2 my-1' style={{ display: isBreak ? "none" : "" }} target='blank' to="https://github.com/rushidurge2003"><GithubOutlined size={10} /></Link>
          </div>
          <div>
            <Link className='btn btn-dark btn-sm mx-2' style={{ display: isBreak ? "none" : "" }} to="/login">Login</Link>
            <Link className='btn btn-dark btn-sm' style={{ display: isBreak ? "none" : "" }} to="/signup">Sign Up</Link>
            <Button type="text" style={{ display: isBreak ? "" : "none" }} onClick={showDrawer} icon={<MenuOutlined />} />
          </div>

        </div>
      </nav>
      <Drawer title="Menu" onClose={onClose} open={open} style={{display:isBreak?"":"none"}}>
        <Button type='text' style={{ paddingTop: 8}} onClick={() => { navigate("/about");  onClose() }}><strong style={{ color: "black" }}>About</strong></Button>
        <Link onClick={onClose} className='btn btn-light btn-sm mx-2 my-1' target='blank' to="https://github.com/rushidurge2003"><GithubOutlined size={10} /></Link>
        <Link onClick={onClose} className='btn btn-dark btn-sm mx-2' to="/login">Login</Link>
        <Link onClick={onClose} className='btn btn-dark btn-sm' to="/signup">Sign Up</Link>
      </Drawer>
    </>
  )
}
