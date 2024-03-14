import React from 'react'
import './welcome.css'
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import usePreventZomm from '../usePreventZoom'
import fimg from './images/first.gif'
import applogo from './images/ExpenseStreet.png'
import sdata from './images/secure-data.png'
// import bvid from './images/back-video.mp4'

export const Welcome = () => {
  usePreventZomm()

  const navigation = useNavigate()

  new Typewriter('#typewriter', {
    strings: ['Hello', 'World'],
    autoStart: true,
  });

  // const dispatch = useDispatch()

  return (
    <>
      <div style={{ width: "100%", height: "60vh", backgroundColor: "gray", position: "absolute", zIndex: -1 }}>
      </div>
      {/* <div className='welcome' style={{ display: "flex", justifyContent: "center" }}> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%", backgroundColor: "white", marginTop: 100, borderTopLeftRadius: "20px", borderTopRightRadius: "20px", boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.16),0px 3px 6px 0px rgba(0,0,0,0.23)" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={applogo} alt="" draggable="false" style={{ width: 620 }} />
            </div>
            {/* <h1 className='text-center' style={{ fontFamily: "Workbench, sans-serif", fontSize: "100px", color: "black", paddingTop: 20 }}>ExpenseStreet</h1> */}
            {/* <h1 className='text-center' style={{ fontFamily: "Workbench, sans-serif", fontSize: "100px", color: "black", paddingTop: 20 }}>ExpenseStreet</h1> */}
            <div>
              <div className='d-flex justify-content-center'>
                <div className='d-flex py-3'>
                  <span>
                    <h1><pre style={{ fontFamily: 'Protest Revolution, sans-serif', color: "black" }}>ExpenseStreet </pre></h1>
                  </span>
                  <h1 style={{ fontFamily: 'Protest Revolution, sans-serif', color: "black" }}>
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
              <button id='login-btn' onClick={() => { navigation("/login") }} className="btn btn-primary mx-3" style={{ width: "150px", backgroundColor: "black", color: 'white', borderColor: "white", fontWeight: "bold" }}>Login</button>
              <button id='sub-btn' onClick={() => { navigation("/signup") }} className="btn btn-primary mx-3" style={{ width: "150px", backgroundColor: "black", color: 'white', borderColor: "white", fontWeight: "bold" }}>Sign Up</button>
            </div>
            <div>
              <div>
                <img src={fimg} alt="" draggable="false" style={{ width: 400 }} />
              </div>
              <div>
                <img src={sdata} alt="" draggable="false" style={{ width: 400 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}