import React from 'react'
import usePreventZoom from '../usePreventZoom'
import aboutvid from './images/aboutvid.mp4'

export const About = () => {
  usePreventZoom()
  return (
    <>
      <div className='container' style={{ position: "relative", top: 70 }}>
        <div className='row'>
          <div className='col-4'>
            <h1 className='text-center'><strong>ExpenseStreet</strong></h1>
            <h2 className='text-center'>ExpenseStreet</h2>
            <h3 className='text-center'>ExpenseStreet</h3>
            <h4 className='text-center'>ExpenseStreet</h4>
            <h5 className='text-center'>ExpenseStreet</h5>
            <h6 className='text-center'>ExpenseStreet</h6>
          </div>
          <div className='col-8'>
            <div style={{ width: "100%", margin: '0 auto' }}>
              <video autoPlay muted loop id="main-video" style={{ objectFit: "fill", width: "100%", borderRadius: 20 }}>
                <source src={aboutvid} />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
