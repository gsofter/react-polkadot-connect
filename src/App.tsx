import React from 'react';
import { Layout, Button } from 'antd'
import { web3Accounts, web3Enable, web3FromAddress, web3ListRpcProviders, web3UseRpcProvider } from '@polkadot/extension-dapp'
import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {

  const handleClickConnect = async () => {
    const allInjected = await web3Enable('my cool dapp')

    const allAccounts = await web3Accounts();

    console.log('allAccounts => ', allAccounts)
    const injector = await web3FromAddress(allAccounts[0].address)
  }

  return (
    <Layout>
      <Header>
        <div style={{ display: 'flex', color: 'white', alignItems: 'center', justifyContent: "space-between" }}>
          <div> LOGO </div>
          <Button onClick={handleClickConnect}> Connect </Button>
        </div>
      </Header>
      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 150px)' }}>
        This is content
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
