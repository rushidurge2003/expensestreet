import React from 'react'
import usePreventZoom from '../usePreventZoom'
import { Footer } from './Footer'
import aboutvid from './images/aboutvid.mp4'
import { Card } from 'antd'

import reactimg from './languageImages/reactjs.png'
import nodejsimg from './languageImages/nodejs.png'
import expressimg from './languageImages/express.png'
import javascriptimg from './languageImages/javascript.png'
import mysqlimg from './languageImages/mysql.png'
import htmlimg from './languageImages/html.png'
import cssimg from './languageImages/css.png'
import jsonimg from './languageImages/json.png'
import bootstrapimg from './languageImages/bootstrap.png'
import creator from './images/creator.gif'
import { useMediaQuery } from 'react-responsive'

const { Meta } = Card

export const About = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <>
      <div className='container' style={{ position: "relative", top: 70 }}>
        <div className=''>
          <div className=''>
            <div style={{ width: "100%", height: "87vh", margin: '0 auto', opacity: 1 }}>
              <video autoPlay muted loop id="main-video" style={{ objectFit: "fill", width: "100%", height: isMobile ? "65vh" : "87vh", borderRadius: 20 }}>
                <source src={aboutvid} />
              </video>
            </div>
          </div>
          <div id="about-box" style={{ width: isMobile ? "100%" : "50%", position: "absolute", color: "white", left: 0, right: 0, top: 0, marginRight: "auto", marginLeft: "auto", backgroundColor: "rgb(0, 0, 0,0.8)", padding: 65, borderRadius: 20 }}>
            <h1 className='text-center' style={{ marginBottom: 30 }}><strong>ExpenseStreet</strong></h1>
            <h5>
              ExpenseStreet is a digital expense management system designed to streamline and simplify the process of tracking, managing, and analyzing expenses for individuals and organizations. The project aims to address the challenges associated with traditional expense tracking methods by providing a user-friendly platform accessible via web and mobile devices.
            </h5>
          </div>
        </div>
        <div style={{ margin: isMobile ? 0 : 50, marginBottom: 100 }}>
          <h5 className='text-center my-3'>Used Languages</h5>
          <div className='d-flex justify-content-evenly'>
            <img className='col-1' src={reactimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={nodejsimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={javascriptimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={expressimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={mysqlimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={htmlimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={cssimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={jsonimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
            <img className='col-1' src={bootstrapimg} alt='' draggable="false" width={isMobile ? 100 : 60} />
          </div>
        </div>
        <h5 className='text-center my-4'>Created by</h5>
        <div className='d-flex justify-content-evenly'>
          <div className=''>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={creator} />}
            >
              <Meta title="Rushikesh Durge" description="" />
            </Card>
          </div>
          {/* <div className=''>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={creator} />}
            >
              <Meta title="Atharva Jori" description="" />
            </Card>
          </div>
          <div className=''>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={creator} />}
            >
              <Meta title="Niraj Kate" description="" />
            </Card>
          </div> */}
        </div>
      </div>
      <div style={{ marginTop: 100 }}>
        <Footer />
      </div>
    </>
  )
}
