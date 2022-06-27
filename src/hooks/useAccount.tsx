import React, { createContext, useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import keyring from '@polkadot/ui-keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { orderBy } from 'lodash';
import * as config from '../config';

interface IAppContext {
  account: KeyringPair;
  accountList: KeyringPair[];
  api: ApiPromise;
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
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect(() => {
    const wsProvider = new WsProvider(config.PROVIDER);

    ApiPromise.create({ provider: wsProvider })
      .then(apiInstance => {
        setApi(apiInstance);
      })
      .catch(e => {
        console.log('ApiPromise.create error: ', e.message);
      });
  }, []);

  const loadAccounts = async () => {
    await web3Enable(config.APP_NAME);
    const injectedAccounts = await web3Accounts();
    if (!isKeyringLoaded()) {
      keyring.loadAll({ isDevelopment: true }, injectedAccounts);
    }

    const allAccounts = orderBy(keyring.getPairs(), ['meta.isTesting'], ['desc']);
    setAccountList(allAccounts);
    setAccount(allAccounts[0]);
  };

  return (
    <AppContext.Provider value={{ account, accountList, loadAccounts, api }}>
      <Spin spinning={!api}>{children}</Spin>
    </AppContext.Provider>
  );
};

export const useAccount = () => ({ ...useContext(AppContext) } as IAppContext);
