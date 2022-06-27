import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Spin, Form } from 'antd';
import { web3FromAddress, web3Enable } from '@polkadot/extension-dapp';
import { AppContextProvider, useAccount } from './hooks/useAccount';
import HeaderBar from './components/Header';
import { balanceToUnitByDecimals, unitToDecimalBalance } from './utils/calculations';
import * as config from './config';
import 'antd/dist/antd.min.css';
import './App.css';
import FormItem from 'antd/lib/form/FormItem';

const { Footer, Content } = Layout;

const BalanceInfo: React.FC = () => {
  const [genesisHash, setGenesisHash] = useState<string | null>(null);
  const { api, account, accountList } = useAccount();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (api) {
      setGenesisHash(api.genesisHash.toHex());
    }
  }, [api]);

  useEffect(() => {
    if (account && api) {
      api.query.system
        .account(account.address, ({ nonce, data: balance }: { data: any; nonce: any }) => {
          console.log(`free balance is ${balance.free.toHuman()}`);
          setBalance(unitToDecimalBalance(balance.free.toNumber(), api.registry.chainDecimals[0]));
        })
        .then((res: any) => {
          console.log('api.query.system.account => ', res.data.free);
          console.log('api.query.system.account => ', res.data.free.toHuman());
          console.log('api.query.system.account => ', res.data.free.toNumber());
          console.log('api.registry.chainTokens =>', api.registry.chainTokens[0]);
          setBalance(unitToDecimalBalance(res.data.free.toNumber(), api.registry.chainDecimals[0]));
        });

      return () => {};
    }

    // account.address
  }, [account]);

  return (
    <div style={{ width: '300px' }}>
      Genesis Hash: {genesisHash} <br />
      Balance Info: {balance}
    </div>
  );
};

const BalanceSender: React.FC = () => {
  const { api, account, accountList } = useAccount();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleClickSend = async () => {
    setLoading(true);
    try {
      await web3Enable(config.APP_NAME);
      const injector = await web3FromAddress(account.address);

      console.log('balanceToUnitByDecimals =>', balanceToUnitByDecimals(amount, 12));
      api.tx.balances
        .transfer(accountList[1].address, balanceToUnitByDecimals(amount, 12))
        .signAndSend(account.address, { signer: injector.signer })
        .then(res => console.log(res))
        .catch(e => console.log(e.message))
        .finally(() => setLoading(false));
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('amount changed => ', e.target.value);
    setAmount(Number(e.target.value));
  };

  return (
    <div style={{ width: '300px', marginTop: '50px' }}>
      {/* <label>To: {accountList[1]?.address}</label> */}
      <Form>
        <FormItem label="Amount">
          <Input onChange={handleChangeAmount} />
        </FormItem>
      </Form>
      <Button
        type="primary"
        style={{ marginTop: '10px' }}
        onClick={handleClickSend}
        loading={loading}>
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
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
