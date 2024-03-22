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
        { value: 2, label: 'Number 2', trigger: '3' },
        { value: 3, label: 'Number 3', trigger: '3' },
      ],
    },
    {
      id: '3',
      message: 'Bye!',
      end: true,
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} headerTitle="ExpenseStreet" floating={true} />
      </ThemeProvider>
    </>
  )
}
