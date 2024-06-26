import React from 'react'
import { useState } from 'react';
import usePreventZoom from './usePreventZoom'
import { AddRecord } from './record/AddRecord';
import { Expense } from './sidebarFun/Expense';
import { Income } from './sidebarFun/Income';
import { AllTransaction } from './sidebarFun/AllTransaction';
import { DeletedTransaction } from './sidebarFun/DeletedTransaction';
import Graph from './graph/Graph';
import { News } from './news/News';
import { Investment } from './invetsment/Investment';
import { Reminder } from './reminder/Reminder';
import { Budget } from './budget/Budget';
import { useMediaQuery } from 'react-responsive'

import {
  FileAddFilled, PieChartFilled, GoldFilled, MailFilled,
  ReadFilled, DeleteFilled, BellFilled
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
        <Investment />
      </>
    )
  }
  if (contentNum === 7) {
    return (
      <>
        <News />
      </>
    )
  }
  if (contentNum === 8) {
    return (
      <>
        <Budget />
      </>
    )
  }
  if (contentNum === 9) {
    return (
      <>
        <Reminder />
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
  // usePreventZoom()
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const [collapsed, setCollapsed] = useState(false);

  const [contentNum, setContentNum] = useState(3)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const item = [{
    key: '1',
    icon: <FileAddFilled />,
    label: 'Record',
    children: [
      {
        key: '2',
        icon: <FileAddFilled />,
        label: 'Expense',
        onClick: () => { setContentNum(1) }
      },
      {
        key: '3',
        icon: <FileAddFilled />,
        label: 'Income',
        onClick: () => { setContentNum(2) }
      },
      {
        key: '4',
        icon: <FileAddFilled />,
        label: 'All Transaction',
        onClick: () => { setContentNum(3) }
      },
      {
        key: '5',
        icon: <DeleteFilled />,
        label: 'Deleted Transaction',
        onClick: () => { setContentNum(4) }
      }
    ],
  },
  {
    key: '6',
    icon: <PieChartFilled />,
    label: 'Analysis',
    onClick: () => { setContentNum(5) }
  },
  {
    key: '7',
    icon: <GoldFilled />,
    label: 'Investment',
    onClick: () => { setContentNum(6) }
  },
  {
    key: '8',
    icon: <ReadFilled />,
    label: 'News',
    onClick: () => { setContentNum(7) }
  },
  {
    key: '9',
    icon: <MailFilled />,
    label: 'Budget',
    onClick: () => { setContentNum(8) }
  },
  {
    key: '10',
    icon: <BellFilled />,
    label: 'Reminder',
    onClick: () => { setContentNum(9) }
  }]

  return (
    <>
      <Layout hasSider>
        {isMobile ?
          <Sider
            style={{
              // overflow: 'auto',
              // height: '100vh',
              position: 'fixed',
              // left: 0,
              top: 56,
              // bottom: 0,
              zIndex: isMobile ? 100 : 0,
              // display:"none"
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={() => { setCollapsed(!collapsed) }}
          >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={item} />
          </Sider> :
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 56,
              // bottom: 0,
              zIndex: isMobile ? 100 : 0,
              // display:"none"
            }}
            collapsible
            onCollapse={() => { setCollapsed(!collapsed) }}
          >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={item} />
          </Sider>}
        <Layout
          style={{
            // marginLeft: collapsed ? 80 : 200,
            marginLeft: isMobile ? 0 : collapsed ? 80 : 200,
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
                padding: 14,
                textAlign: 'center',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <DisplayData contentNum={contentNum} />
            </div>
          </Content>
        </Layout>
      </Layout>
      <AddRecord />
    </>
  );

}
