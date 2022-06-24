import React, { createContext, useState } from 'react'
import keyring from '@polkadot/ui-keyring'
import { KeyringPair } from '@polkadot/keyring/types'
import { web3Accounts, web3Enable, web3FromAddress, web3ListRpcProviders, web3UseRpcProvider } from '@polkadot/extension-dapp'
import * as config from '../config'

interface IAppContext {
    account: KeyringPair
    accountList: KeyringPair[]
}
const AppContext = createContext<IAppContext | object>({})

const isKeyringLoaded = () => {
    try {
        if (!!keyring.keyring) return true
    } catch (e) {
        return false
    }
}

interface IAppContextProviderProps {
    children: React.ReactNode
}

export const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<IAppContext['account']>()
    const [accountList, setAccountList] = useState<IAppContext['accountList']>()

    const loadAccounts = async () => {
        await web3Enable(config.APP_NAME)
        const injectedAccounts = await web3Accounts();

        if (!isKeyringLoaded()) {
            keyring.loadAll({ isDevelopment: true }, injectedAccounts)
        }

        const allAccounts = keyring.getPairs()
        const injector = await web3FromAddress(allAccounts[0].address)
    }

    return < AppContext.Provider value={{ account, accountList, loadAccounts }}> {children}</AppContext.Provider>
}

