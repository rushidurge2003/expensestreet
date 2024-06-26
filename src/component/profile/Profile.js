import React, { useEffect } from 'react'
import usePreventZoom from '../usePreventZoom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../slice/ProfileDetailSlice';
import { useDispatch } from 'react-redux';
import { Descriptions } from 'antd';
import { useMediaQuery } from 'react-responsive'

export const Profile = () => {
  // usePreventZoom()
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const state = useSelector((state) => state.ProfileDetailSliceReducer?.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserDetails(localStorage.getItem("username")))
  }, [])

  const items = [
    {
      key: '1',
      label: 'Name',
      children: state.data?.[0].name,
    },
    {
      key: '2',
      label: 'Email',
      children: state.data?.[0].email,
    },
    {
      key: '3',
      label: 'Contact',
      children: state.data?.[0].contact,
    }
  ];


  return (
    <>
      <div className='container' style={{ position: 'relative', top: 70, }}>
        <div className='d-flex justify-content-center align-items-center'>
          <Avatar size={isMobile ? 70 : 100} icon={<UserOutlined />} />
        </div>
        <div>
          <h5 className='text-center'>{localStorage.getItem("username")}</h5>
          <h4 className='text-center'>{state.data?.[0].name}</h4>
        </div>
        <hr />
        <div className='row'>
          <Descriptions size='default' title="User Info" layout="vertical" items={items} />
        </div>
      </div>
    </>
  )
}