import React from 'react'
import { Card } from 'antd'

export const Notification = () => {

  const displayNoti = () => {
    for (let i = 0; i < 5; i++) {
      return (
        <Card title="Card title" bordered={true} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      )
    }
  }

  return (
    <>
      {/* <div style={{
        position: 'relative',
        top: 70,
      }}> */}
        Notification
      {/* </div> */}
      {displayNoti}
    </>
  )
}
