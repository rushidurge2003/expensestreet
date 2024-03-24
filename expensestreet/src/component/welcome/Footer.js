import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined, XOutlined, FacebookOutlined } from '@ant-design/icons';

export const Footer = () => {
  return (
    <>
      <div style={{ marginTop: 60, marginBottom: 0, padding: 10, boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.16),0px 3px 6px 0px rgba(0,0,0,0.23)" }}>
        <div style={{ paddingLeft: 40, paddingRight: 40, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <div>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://github.com/rushidurge2003"><GithubOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://in.linkedin.com"><LinkedinOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://www.instagram.com"><InstagramOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://twitter.com/?lang=en"><XOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://www.facebook.com"><FacebookOutlined size={10} /></Link>
          </div>
          <div>Get connected with us on social networks</div>
          <div>
            Contact us : <strong><a target='blank' href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=rushikeshdurge7794@gmail.com">rushikeshdurge7794@gmail.com</a></strong>
          </div>
        </div>
        <hr />
        <div style={{ marginBottom: 20 }}>
          <h6 className='text-center'>ExpenseStreet ©{new Date().getFullYear()} Created by : Rushikesh Durge,Atharva Jori,Niraj Kate</h6>
        </div>
      </div>
    </>
  )
}
