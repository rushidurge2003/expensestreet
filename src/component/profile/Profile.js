// import React, { useEffect } from 'react'
// import usePreventZoom from '../usePreventZoom'
// import { Avatar } from 'antd'
// import { UserOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';
// import { getUserDetails } from '../../slice/ProfileDetailSlice';
// import { useDispatch } from 'react-redux';
// import { Descriptions } from 'antd';

// export const Profile = () => {
//   usePreventZoom()

//   const state = useSelector((state) => state.ProfileDetailSliceReducer?.userData)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(getUserDetails(localStorage.getItem("username")))
//   }, [])

//   const items = [
//     {
//       key: '1',
//       label: 'Name',
//       children: state.data?.[0].name,
//     },
//     {
//       key: '2',
//       label: 'Email',
//       children: state.data?.[0].email,
//     },
//     {
//       key: '3',
//       label: 'Contact',
//       children: state.data?.[0].contact,
//     }
//   ];


//   return (
//     <>
//       <div className='container' style={{ position: 'relative', top: 70, }}>
//         <Avatar style={{ left: "46%" }} size={100} icon={<UserOutlined />} />
//         <h5 className='text-center'>{localStorage.getItem("username")}</h5>
//         <h4 className='text-center'>{state.data?.[0].name}</h4>
//         <hr />
//         <div className='row'>
//           <Descriptions size='default' title="User Info" layout="vertical" items={items} />
//         </div>
//       </div>
//     </>
//   )
// }

import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useMediaQuery } from 'react-responsive'
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

export const Profile = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      {isMobile ?
        <Sider
          style={{
            // overflow: 'auto',
            // height: '100vh',
            // position: 'fixed',
            // left: 0,
            // top: 56,
            // bottom: 0,
            // display: "none"
            zIndex:100
          }}
          // collapsible
          // onCollapse={() => {  }}
          // style={{ marginTop: 100 }}

          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
        : <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 56,
            bottom: 0,
            // display: "none"
          }}
          collapsible
        // onCollapse={() => {  }}
        // style={{ marginTop: 100 }}

        // breakpoint="lg"
        // collapsedWidth="0"
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};