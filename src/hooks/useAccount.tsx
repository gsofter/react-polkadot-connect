import React, { createContext, useContext, useState } from 'react';
import keyring from '@polkadot/ui-keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider
} from '@polkadot/extension-dapp';
import { orderBy } from 'lodash';
import * as config from '../config';

interface IAppContext {
  account: KeyringPair;
  accountList: KeyringPair[];
  loadAccounts: () => void;
}
const AppContext = createContext<IAppContext | object>({});

const isKeyringLoaded = () => {
  try {
    if (!!keyring.keyring) return true;
  } catch (e) {
    return false;
  }
};

interface IAppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<IAppContext['account']>();
  const [accountList, setAccountList] = useState<IAppContext['accountList']>();

  const loadAccounts = async () => {
    console.log('loadAccounts => ');
    await web3Enable(config.APP_NAME);
    const injectedAccounts = await web3Accounts();

    console.log('isKeyringLoaded => ', isKeyringLoaded());
    if (!isKeyringLoaded()) {
      keyring.loadAll({ isDevelopment: true }, injectedAccounts);
    }

    const allAccounts = orderBy(keyring.getPairs(), ['meta.isTesting'], ['desc']);
    console.log('loadAccounts => ', allAccounts);
    setAccountList(allAccounts);
    setAccount(allAccounts[0]);
    console.log('loadAccounts => ', allAccounts[0].address);
    // const injector = await web3FromAddress(allAccounts[0].address)
  };

  return (
    <AppContext.Provider value={{ account, accountList, loadAccounts }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAccount = () => ({ ...useContext(AppContext) } as IAppContext);
