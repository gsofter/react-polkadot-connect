import React from 'react'
import { Layout, Button } from 'antd'
import { web3Accounts, web3Enable, web3FromAddress, web3ListRpcProviders, web3UseRpcProvider } from '@polkadot/extension-dapp'

const { Header } = Layout

const HeaderBar: React.FC = () => {
    const handleClickConnect = async () => {
        const allInjected = await web3Enable('my cool dapp')
        const allAccounts = await web3Accounts();
        console.log('allAccounts => ', allAccounts)
        const injector = await web3FromAddress(allAccounts[0].address)
    }

    return (<Header>
        <div style={{ display: 'flex', color: 'white', alignItems: 'center', justifyContent: "space-between" }}>
            <div> LOGO </div>
            <Button type="primary" onClick={handleClickConnect}> Connect </Button>
        </div>
    </Header>)
}

export default HeaderBar