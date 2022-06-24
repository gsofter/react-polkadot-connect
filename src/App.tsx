import React, { createContext } from 'react';
import { Layout, Button } from 'antd'
import { web3Accounts, web3Enable, web3FromAddress, web3ListRpcProviders, web3UseRpcProvider } from '@polkadot/extension-dapp'
import { KeyringPair } from '@polkadot/keyring/types'
import HeaderBar from './components/Header'
import 'antd/dist/antd.css';
import './App.css';

const { Footer, Content } = Layout;



function App() {
  return (

    <Layout>
      <HeaderBar />
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 150px)' }}>
        This is content
      </Content>
      <Footer>Footer</Footer>
    </Layout>

  );
}

export default App;
