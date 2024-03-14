import React from 'react'
import { Button } from 'antd'
import { GithubOutlined, LinkedinOutlined, InstagramOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';

export const Footer = () => {
  return (
    <>
      <div style={{  marginTop: 30, marginBottom: 0, padding: 10, boxShadow: "0px 3px 6px 0px rgba(0,0,0,0.16),0px 3px 6px 0px rgba(0,0,0,0.23)" }}>
        <div className='d-flex justify-content-between' style={{ paddingLeft: 40, paddingRight: 40 }}>
          <div>
            Get connected with us on social networks:
          </div>
          <div>
            <Button type="text" shape="circle" size='large' icon={<GithubOutlined />} />
            <Button type="text" shape="circle" size='large' icon={<LinkedinOutlined />} />
            <Button type="text" shape="circle" size='large' icon={<InstagramOutlined />} />
            <Button type="text" shape="circle" size='large' icon={<TwitterOutlined />} />
            <Button type="text" shape="circle" size='large' icon={<FacebookOutlined />} />
          </div>
        </div>
        <hr />
        <div>

        </div>
      </div>
    </>
  )
}
