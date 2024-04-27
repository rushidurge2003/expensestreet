import React from 'react'
// import ChatBot from 'react-simple-chatbot'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: 'black',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: 'black',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

export const Chatbot = () => {

  const steps = [
    {
      id: '0',
      message: `Welcome`,
      trigger: '1',
    },
    {
      id: '1',
      message: 'How can I help you',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Expense', trigger: '3' },
        { value: 2, label: 'Income', trigger: '4' },
        { value: 3, label: 'Investment', trigger: '5' },
      ],
    },
    {
      id: '3',
      message: 'Expense',
      end: true,
    },
    {
      id: '4',
      message: 'Income',
      end: true,
    },
    {
      id: '5',
      options: [
        { value: 1, label: 'Types Of Investment', trigger: '6' },
      ],
    },
    {
      id:'6',
      message : "1)Stocks 2)Bonds 3)Mutual Funds 4)Real Estate 5)Commodities",
      trigger : '1'
    }
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} headerTitle="ExpenseStreet" floating={true} />
      </ThemeProvider>
    </>
  )
}
