import React from 'react'
import usePreventZoom from '../usePreventZoom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export const Profile = () => {
  usePreventZoom()

  const state = useSelector((state)=>state.ProfileDetailSliceReducer.userData)
  return (
    <>
      <div style={{
            position: 'relative',
            top: 70,
          }}>
        <Avatar style={{left:"46%"}} size={100} icon={<UserOutlined />} />
        <h5 className='text-center'>{localStorage.getItem("username")}</h5>
        <h3 className='text-center'>{state.data?.[0].name}</h3>
      </div>
    </>
  )
}
