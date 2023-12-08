import Head from 'next/head';
import { useState } from 'react';
import { useNetwork } from 'wagmi';

import styles from '@/styles/Home.module.css';

import {
  SignMessage,
  RecoverMessage,
  ContractWrite,
  ContractRead,
  Menu,
} from '@/components';

export default function Home() {
  const { chain } = useNetwork();
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <>
      <Head>
        <title>WalletConnect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div
          className={styles.backdrop}
          style={{
            opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
          }}
        />
        <Menu />
        <div className={styles.header}>
          <div></div>
          <div className={styles.buttons}>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isNetworkSwitchHighlighted ? styles.highlightSelected : ``
              }`}
            >
              <w3m-network-button />
            </div>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isConnectHighlighted ? styles.highlightSelected : ``
              }`}
            >
              <w3m-button />
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <h2>签名</h2>
        <SignMessage />
        <RecoverMessage />
        <h2>合约调用</h2>
        <h3>写操作</h3>
        {chain ? <ContractWrite /> : null}
        <h3>读操作 & 计算价值</h3>
        <ContractRead />
      </main>
    </>
  );
}
