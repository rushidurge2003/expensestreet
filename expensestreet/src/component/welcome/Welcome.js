import React from 'react'
import './welcome.css'
import Typewriter from 'typewriter-effect'
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import { Chatbot } from '../chat/Chatbot'
import usePreventZomm from '../usePreventZoom'
import applogo from './images/ExpenseStreet.png'
import exp1 from './images/exp1.gif'
import exp2 from './images/exp2.png'
import exp3 from './images/exp3.png'
import exp4 from './images/exp4.png'
import vid from './images/back.mp4'

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
        <div style={{ width: "100%", margin: '0 auto' }}>
          <video autoPlay muted loop id="main-video" style={{ objectFit: "fill", width: "100%", height: "60vh" }}>
            <source src={vid} />
          </video>
        </div>
      </div>
      {/* <div className='welcome' style={{ display: "flex", justifyContent: "center" }}> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%", backgroundColor: "white", marginTop: 100, borderTopLeftRadius: "20px", borderTopRightRadius: "20px", boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.16),0px 3px 6px 0px rgba(0,0,0,0.23)" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={applogo} alt="" draggable="false" style={{ width: 620 }} />
            </div>
            <div>
              <div className='d-flex justify-content-center'>
                <div className='d-flex py-3'>
                  <span>
                    <h1><pre style={{ fontFamily: 'Protest Revolution, sans-serif', color: "black" }}>ExpenseStreet </pre></h1>
                  </span>
                  <h1 style={{ fontFamily: 'Lora, serif', color: "black" }}>
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
              <div className='row'>
                <div className='col-6'>
                  <img src={exp1} alt="" draggable="false" style={{ width: 350 }} />
                </div>
                <div className='col-6'>
                  <h4 className='text-center' style={{ marginTop: 55 }}>Data Presentation</h4>
                  <p className='px-3'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, ex aperiam corrupti quisquam totam amet aut earum suscipit distinctio cupiditate ducimus aliquid autem facere voluptas error beatae laudantium neque voluptate sint sequi explicabo natus hic odit? Modi nobis dolores doloribus culpa magnam sequi cupiditate ex error, quibusdam, quidem non molestias.
                  </p>
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <h4 className='text-center' style={{ marginTop: 55 }}>Authentication</h4>
                  <p className='px-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolores libero necessitatibus sunt voluptatibus repellat aspernatur quas incidunt nam eveniet facilis quia quasi tempora alias reiciendis, optio voluptatem rerum similique ducimus laboriosam ea? Corrupti corporis doloremque repudiandae omnis? Blanditiis optio dolor qui obcaecati rem, dicta aut id distinctio tempora placeat?
                  </p>
                </div>
                <div className='col-6'>
                  <img src={exp2} alt="" draggable="false" style={{ width: 350 }} />
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <img src={exp3} alt="" draggable="false" style={{ width: 350 }} />
                </div>
                <div className="col-6">
                  <h4 className="text-center" style={{ marginTop: 55 }}>Reminder</h4>
                  <p className="px-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit amet, atque iure eos molestias soluta eaque necessitatibus maiores provident sapiente. Itaque totam temporibus ullam. In repellendus rerum quaerat enim qui quis amet quidem, provident ut veniam eveniet modi reiciendis est, hic ea nam commodi quo totam magni, inventore atque explicabo!
                  </p>
                </div>
              </div>
              <div className='row'>
                <div className="col-6">
                  <h4 className="text-center" style={{ marginTop: 55 }}>News</h4>
                  <p className="px-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure ratione vero, soluta facilis ullam perferendis porro ea magni modi id optio, quae cum, iusto dolor. Aliquid aut, fugiat ab laborum magnam soluta officiis ex possimus nobis quaerat obcaecati enim suscipit temporibus tempora distinctio! A voluptate pariatur ipsam nihil ex cumque!
                  </p>
                </div>
                <div className='col-6'>
                  <img src={exp4} alt="" draggable="false" style={{ width: 300 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <Chatbot />
    </>
  )
}