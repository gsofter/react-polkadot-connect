import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { AppContextProvider } from './hooks/useAccount';
import HeaderBar from './components/Header';
import 'antd/dist/antd.min.css';
import './App.css';

const { Footer, Content } = Layout;

const BalanceInfo: React.FC = () => {
  const wsProvider = new WsProvider('wss://regnet-relay-rpc.parallel.fi');
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [genesisHash, setGenesisHash] = useState<string | null>(null);

  useEffect(() => {
    const createApiInstance = async () => {
      const api = await ApiPromise.create({ provider: wsProvider });
      setApi(api);
      setGenesisHash(api.genesisHash.toHex());
    };

    createApiInstance();
  });

  return (
    <div style={{ width: '300px' }}>
      Genesis Hash: {genesisHash} <br />
      Balance Info:
    </div>
  );
};

const BalanceSender: React.FC = () => {
  return (
    <div style={{ width: '300px' }}>
      <Input />
      <Button type="primary" style={{ marginTop: '10px' }}>
        Send
      </Button>
    </div>
  );
};

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <HeaderBar />
        <Content style={{ padding: '50px 50px', minHeight: 'calc(100vh - 150px)' }}>
          <div
            style={{
              padding: '0 50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <BalanceInfo />
            <BalanceSender />
          </div>
          This is content
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
