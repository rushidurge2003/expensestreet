import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Result style={{
        position: 'relative',
        top: 70,
      }}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={()=>{navigate("/")}}>Back Home</Button>}
      />
    </>
  )
}
