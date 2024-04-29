import React from 'react'
import './welcome.css'
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import { Chatbot } from '../chat/Chatbot'
import usePreventZomm from '../usePreventZoom'
import applogo from './images/ExpenseStreet2.png'
import exp1 from './images/exp1.gif'
import exp2 from './images/exp2.png'
import exp3 from './images/exp3.png'
import exp4 from './images/exp4.png'
import exp5 from './images/exp5.gif'
import exp6 from './images/exp6.png'
import vid from './images/back.mp4'
import { useMediaQuery } from 'react-responsive'

export const Welcome = () => {

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

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
        <div style={{ width: "100%", margin: '0 auto' }}>
          <video autoPlay muted loop id="main-video" style={{ objectFit: "fill", width: "100%", height: "60vh" }}>
            <source src={vid} />
          </video>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: isMobile ? "100%" : "60%", backgroundColor: "white", marginTop: 100, borderTopLeftRadius: "20px", borderTopRightRadius: "20px", boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.16),0px 3px 6px 0px rgba(0,0,0,0.23)" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={applogo} alt="" draggable="false" style={{ width: isMobile ? 300 : 620 }} />
            </div>
            <div>
              <div className='d-flex justify-content-center'>
                <div className='d-flex py-3'>
                  <span>
                    <h1><pre style={{ fontFamily: 'Lora, serif', color: "black", display:isMobile?"none":"" }}> <b>ExpenseStreet</b> </pre></h1>
                  </span>
                  <h2 style={{ fontFamily: 'Lora, serif', color: "black" }}>
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
                  </h2>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <button id='login-btn' onClick={() => { navigation("/login") }} className="btn btn-primary mx-3" style={{ width: "150px", backgroundColor: "black", color: 'white', borderColor: "white", fontWeight: "bold" }}>Login</button>
              <button id='sub-btn' onClick={() => { navigation("/signup") }} className="btn btn-primary mx-3" style={{ width: "150px", backgroundColor: "black", color: 'white', borderColor: "white", fontWeight: "bold" }}>Sign Up</button>
            </div>
            <div>
              <div className='row'>
                <div className='col-md-6 d-flex justify-content-center'>
                  <img src={exp1} alt="" draggable="false" style={{ width: isMobile ? 200 : 350 }} />
                </div>
                <div className='col-md-6'>
                  <h4 className='text-center' style={{ marginTop: 55 }}>Data visualization</h4>
                  <p className='px-3'>
                    It aims to communicate insights and patterns in data through visual elements such as charts, graphs, maps, and infographics. By presenting data visually, complex information becomes more accessible, allowing viewers to understand trends, correlations, and outliers more easily.
                  </p>
                </div>
              </div>
              <hr style={{ margin: 10 }} />
              <div className='row'>
                <div className='col-md-6'>
                  <h4 className='text-center' style={{ marginTop: 55 }}>Authentication</h4>
                  <p className='px-3'>
                    authentication stands as the guardian of our digital fortresses. Our authentication method represents the pinnacle of security and user experience, setting a new standard in safeguarding sensitive information while ensuring seamless access.
                  </p>
                </div>
                <div className='col-md-6 d-flex justify-content-center'>
                  <img src={exp2} alt="" draggable="false" style={{ width: isMobile ? 200 : 350 }} />
                </div>
              </div>
              <hr style={{ margin: 10 }} />
              <div className='row'>
                <div className='col-md-6 d-flex justify-content-center'>
                  <img src={exp3} alt="" draggable="false" style={{ width: isMobile ? 200 : 350 }} />
                </div>
                <div className="col-md-6">
                  <h4 className="text-center" style={{ marginTop: 55 }}>Reminder</h4>
                  <p className="px-3">
                    Our application is designed to provide gentle reminders, ensuring you stay on track with your commitments and deadlines effortlessly. With our intuitive interface and customizable settings, you can easily schedule reminders for important events, tasks, or appointments.
                    Whether it's a deadline for a project, a meeting with a client, or a personal task, our application allows you to set reminders at your preferred frequency and time.You can receive notifications via <strong>Email</strong>, ensuring you never miss an important deadline again.
                  </p>
                </div>
              </div>
              <hr style={{ margin: 10 }} />
              <div className='row'>
                <div className="col-md-6">
                  <h4 className="text-center" style={{ marginTop: 55 }}>News</h4>
                  <p className="px-3">
                    Our curated selection of business news sources ensures that you receive relevant and high-quality content tailored to your interests. Whether you're interested in finance, technology, entrepreneurship, or global markets, our application provides a comprehensive overview of the latest headlines and analysis from trusted sources.
                  </p>
                </div>
                <div className='col-md-6 d-flex justify-content-center'>
                  <img src={exp4} alt="" draggable="false" style={{ width: isMobile ? 200 : 300 }} />
                </div>
              </div>
              <hr style={{ margin: 10 }} />
              <div className='row'>
                <div className='col-md-6 d-flex justify-content-center'>
                  <img src={exp5} alt="" draggable="false" style={{ width: isMobile ? 200 : 330 }} />
                </div>
                <div className="col-md-6">
                  <h4 className="text-center" style={{ marginTop: 55 }}>Budget</h4>
                  <p className="px-3">
                    Allow users to set financial goals such as saving for a vacation, buying a house, paying off debt, etc. The application can help track progress towards these goals and provide recommendations on how to achieve them faster.
                  </p>
                </div>
              </div>
              <hr style={{ margin: 10 }} />
              <div className='row'>
                <div className="col-md-6">
                  <h4 className="text-center" style={{ marginTop: 55 }}>Updates</h4>
                  <p className="px-3">
                    Frequent updates and bug fixes are essential for maintaining a high-quality user experience and ensuring the security and stability of the application.
                  </p>
                </div>
                <div className='col-md-6 d-flex justify-content-center'>
                  <img src={exp6} alt="" draggable="false" style={{ width: isMobile ? 200 : 260 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <Footer /> */}
      </div>
      {/* <Chatbot /> */}
    </>
  )
}