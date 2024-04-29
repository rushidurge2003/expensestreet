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
          <Link className="navbar-brand" to="/" style={{ color: "black" }}> <b>ExpenseStreet</b></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className='nav-item'><Button type='text' style={{ paddingTop: 8 }} onClick={() => { navigate("/about") }}><strong style={{ color: "black" }}>About</strong></Button></li>
              <li className='nav-item'><Link className='btn btn-light btn-sm mx-2 my-1' target='blank' to="https://github.com/rushidurge2003"><GithubOutlined size={10} /></Link></li>
              <li className='nav-item'><Link className='btn btn-dark btn-sm mx-2' to="/login">Login</Link></li>
              <li className='nav-item'><Link className='btn btn-dark btn-sm' to="/signup">Sign Up</Link></li>
            </ul>
            <div>


            </div>
            <div>


            </div>
          </div>

        </div>
      </nav>
    </>
  )
}
