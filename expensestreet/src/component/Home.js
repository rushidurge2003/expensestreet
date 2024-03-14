import React from 'react'
import { useState } from 'react';
import usePreventZoom from './usePreventZoom'
import { Chatbot } from './chat/Chatbot'
import { AddRecord } from './record/AddRecord';
import { Expense } from './sidebarFun/Expense';
import { Income } from './sidebarFun/Income';
import { AllTransaction } from './sidebarFun/AllTransaction';
import { DeletedTransaction } from './sidebarFun/DeletedTransaction';
import Graph from './graph/Graph';

import {
  FileAddOutlined,
  PieChartOutlined,
  UserAddOutlined,
  LineChartOutlined,
  ReadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const DisplayData = ({ contentNum }) => {
  if (contentNum === 1) {
    return (
      <>
        <Expense />
      </>
    )
  }
  if (contentNum === 2) {
    return (
      <>
        <Income />
      </>
    )
  }
  if (contentNum === 3) {
    return (
      <>
        <AllTransaction />
      </>
    )
  }
  if (contentNum === 4) {
    return (
      <>
        <DeletedTransaction />
      </>
    )
  }
  if (contentNum === 5) {
    return (
      <>
        <Graph />
      </>
    )
  }
  if (contentNum === 6) {
    return (
      <>
        <h1>News</h1>
      </>
    )
  }
  if (contentNum === 7) {
    return (
      <>
        <h1>Stock Market</h1>
      </>
    )
  }
  if (contentNum === 8) {
    return (
      <>
        <h1>Friend</h1>
      </>
    )
  }
}


// ===============
// 
// 
//  Drive Code
// 
// 
// ===============

export const Home = () => {
  usePreventZoom()

  const [contentNum, setContentNum] = useState(1)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 56,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={[
            {
              key: '1',
              icon: <FileAddOutlined />,
              label: 'Record',
              children: [
                {
                  key: '2',
                  icon: <FileAddOutlined />,
                  label: 'Expense',
                  onClick: () => { setContentNum(1) }
                },
                {
                  key: '3',
                  icon: <FileAddOutlined />,
                  label: 'Income',
                  onClick: () => { setContentNum(2) }
                },
                {
                  key: '4',
                  icon: <FileAddOutlined />,
                  label: 'All Transaction',
                  onClick: () => { setContentNum(3) }
                },
                {
                  key: '5',
                  icon: <DeleteOutlined />,
                  label: 'Deleted Transaction',
                  onClick: () => { setContentNum(4) }
                }
              ],
            },
            {
              key: '6',
              icon: <PieChartOutlined />,
              label: 'Analysis',
              onClick: () => { setContentNum(5) }
            },
            {
              key: '7',
              icon: <ReadOutlined />,
              label: 'News',
              onClick: () => { setContentNum(6) }
            },
            {
              key: '8',
              icon: <LineChartOutlined />,
              label: 'Stock Market',
              onClick: () => { setContentNum(7) }
            },
            {
              key: '9',
              icon: <UserAddOutlined />,
              label: 'Friend',
              onClick: () => { setContentNum(8) }
            }
          ]} />
        </Sider>
        <Layout
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '2px 16px 0',
              overflow: 'initial',
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <DisplayData contentNum={contentNum} />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              position: "fixed",
              bottom: 0,
              width: "87%",
              padding: 10
            }}
          >
            ExpenseStreet ©{new Date().getFullYear()} Created by Rushikesh Durge,Atharva Jori,Niraj Kate
          </Footer>
        </Layout>
      </Layout>
      <Chatbot />
      <AddRecord />
    </>
  );

}
