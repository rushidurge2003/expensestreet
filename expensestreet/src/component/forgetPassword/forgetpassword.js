import React from 'react'
import randn from 'randn'
import { useState } from 'react'

export const forgetpassword = () => {

const generateOTP = () =>{
  
}

  return (
    <>
      <div style={{ position: "absolute", top: "10%", left: "30%" }}>
        <div
          style={{
            width: "500px"
          }}
        >
          <h2 className='text-center'>Set New Password</h2>
          <form>
            <div className="mb-3">
              <label htmlForfor="exampleInputEmail1" className="form-label">Username</label>
              <input type="username" className="form-control" id="exampleInputEmail1" />
            </div>
            <div className="mb-3">
              <label htmlForfor="exampleInputPassword1" className="form-label">OTP</label>
              <input maxLength={6} className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Generate OTP</button>
          </form>
        </div>
      </div>
    </>
  )
}
