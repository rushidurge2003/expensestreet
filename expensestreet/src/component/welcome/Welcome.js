import React from 'react'
import './welcome.css'
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import { getUser } from '../../slice/SignUpSlice'

export const Welcome = () => {

  const navigation = useNavigate()

  new Typewriter('#typewriter', {
    strings: ['Hello', 'World'],
    autoStart: true,
  });

  // const dispatch = useDispatch()

  return (
    <>
      <div className='welcome'>
        <div>
          <h1 className='text-center' style={{ fontFamily: "Workbench, sans-serif", fontSize: "100px", color: "white" }}>ExpenseStreet</h1>
          <div>
            <div className='d-flex justify-content-center'>
              <div className='d-flex py-3'>
                <span>
                  <h1><pre style={{ fontFamily: 'Protest Revolution, sans-serif', color: "white" }}>ExpenseStreet </pre></h1>
                </span>
                <h1 style={{ fontFamily: 'Protest Revolution, sans-serif', color: "white" }}>
                  <Typewriter
                    options={{
                      strings: ['Manage your Expenses',
                        'Manage your Income',
                        'Manage your Budget',
                        'Analysis your Data'],
                      autoStart: true,
                      loop: true,
                      pauseFor: 1500
                    }}
                  />
                </h1>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <button id='login-btn' onClick={() => { navigation("/login") }} className="btn btn-primary mx-3" style={{ width: "150px", backgroundColor: "white", color: 'black', borderColor: "white", fontWeight: "bold" }}>Login</button>
            <button id='sub-btn' onClick={() => { navigation("/signup") }} className="btn btn-primary mx-3" style={{ width: "150px", backgroundColor: "white", color: 'black', borderColor: "white", fontWeight: "bold" }}>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  )
}