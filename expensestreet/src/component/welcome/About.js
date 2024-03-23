import React from 'react'
import usePreventZoom from '../usePreventZoom'

export const About = () => {
  usePreventZoom()
  return (
    <>
      <div style={{ position: "relative", top: 70 }}>
        <h1 className='text-center'><strong>ExpenseStreet</strong></h1>
      </div>
    </>
  )
}
