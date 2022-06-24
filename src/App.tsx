import React from 'react';
import logo from './logo.svg';
import './App.css';

import { web3Accounts, web3Enable, web3FromAddress, web3ListRpcProviders, web3UseRpcProvider } from '@polkadot/extension-dapp'

function App() {

  const handleClickConnect = async () => {
    const allInjected = await web3Enable('my cool dapp')

    const allAccounts = await web3Accounts();

    console.log('allAccounts => ', allAccounts)
    const injector = await web3FromAddress(allAccounts[0].address)


  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClickConnect}> Connect </button>
      </header>
    </div>
  );
}

export default App;
