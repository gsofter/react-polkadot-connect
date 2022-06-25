import React, { createContext } from 'react';
import { Layout, Button } from 'antd';
import { AppContextProvider } from './hooks/useAccount';
import HeaderBar from './components/Header';
import 'antd/dist/antd.min.css';
import './App.css';

const { Footer, Content } = Layout;

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <HeaderBar />
        <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 150px)' }}>
          This is content
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
