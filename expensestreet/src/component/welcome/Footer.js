import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';

export const Footer = () => {
  return (
    <>
      <div style={{ marginTop: 30, marginBottom: 0, padding: 10, boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.16),0px 3px 6px 0px rgba(0,0,0,0.23)" }}>
        <div className='d-flex justify-content-between' style={{ paddingLeft: 40, paddingRight: 40 }}>
          <div>
            Get connected with us on social networks:
          </div>
          <div>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://github.com/rushidurge2003"><GithubOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://in.linkedin.com"><LinkedinOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://www.instagram.com"><InstagramOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://twitter.com/?lang=en"><TwitterOutlined size={10} /></Link>
            <Link className='btn btn-light btn-md mx-2 my-1' target='blank' to="https://www.facebook.com"><FacebookOutlined size={10} /></Link>
          </div>
        </div>
        <hr />
        <div>
          <h6 className='text-center'>ExpenseStreet ©{new Date().getFullYear()} Created by Rushikesh Durge,Atharva Jori,Niraj Kate</h6>

        </div>
      </div>
    </>
  )
}
