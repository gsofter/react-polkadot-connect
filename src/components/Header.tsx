import React from 'react';
import { Layout, Button } from 'antd';
import { useAccount } from '../hooks/useAccount';

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  const { account, loadAccounts } = useAccount();
  const handleClickConnect = () => {
    loadAccounts();
  };

  return (
    <Header>
      <div
        style={{
          display: 'flex',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <div> LOGO </div>
        {account ? (
          <> {account.address}</>
        ) : (
          <Button type="primary" onClick={handleClickConnect}>
            Connect
          </Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderBar;
