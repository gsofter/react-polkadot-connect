import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';
import { AppContextProvider, useAccount } from './hooks/useAccount';
import HeaderBar from './components/Header';
import 'antd/dist/antd.min.css';
import './App.css';

const { Footer, Content } = Layout;

const BalanceInfo: React.FC = () => {
  const [genesisHash, setGenesisHash] = useState<string | null>(null);
  const { api, account } = useAccount();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (api) {
      setGenesisHash(api.genesisHash.toHex());
    }
  }, [api]);

  useEffect(() => {
    if (account && api) {
      api.query.system.account(account.address).then((res: any) => {
        console.log('api.query.system.account => ', res.data.free);
        console.log('api.query.system.account => ', res.data.free.toHuman());
        setBalance(res.data.free);
      });
    }

    // account.address
  }, [account]);

  return (
    <div style={{ width: '300px' }}>
      Genesis Hash: {genesisHash} <br />
      {/* Balance Info: {balance} */}
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
