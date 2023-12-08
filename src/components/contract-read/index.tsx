import React, { FC, useState, useEffect, useRef } from 'react';
import { Contract, Provider } from 'ethers-multicall';
import { ethers, BigNumber, FixedNumber } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { Button } from '@/components';
import erc20Abi from '@/contract/erc20.json';
import { tokenList } from './token-list';
import { infuraKey } from '@/const';

interface IProps {}

export type Chains = 'matic' | 'optimism' | 'bsc';
export type TokenChainItem = {
  id: number;
  chainId: number;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  tokenDecimal: number;
  tokenClassId: number;
  balance?: string | number;
  balanceUSD?: string | number;
  flag: 0 | 1;
};
export interface TokenItem {
  id: number;
  tokenClassName: string;
  price: string;
  balance?: string | number;
  balanceUSD?: string | number;
  whitelists: TokenChainItem[];
}

const ContractRead: FC<IProps> = (props) => {
  const [calls, setCalls] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const { chain } = useNetwork();
  const { address, isDisconnected } = useAccount();
  const result = useRef<TokenItem[]>();
  result.current = tokenList;
  useEffect(() => {
    const prev = result.current;
    for (let i = 0; i < prev.length; i++) {
      prev[i].balance = 0;
      prev[i].balanceUSD = 0;
      const whitelists = prev[i].whitelists;
      if (whitelists) {
        for (let j = 0; j < whitelists.length; j++) {
          whitelists[j].balance = 0;
          whitelists[j].balanceUSD = 0;
        }
      }
    }
  }, []);

  //   const address = '0x07F80fA78D7b67A301243cCe969CB1D9834920Aa';

  //   const provider = new ethers.providers.InfuraProvider('mainnet', infuraKey);
  //   const provider = new ethers.providers.InfuraProvider('matic', infuraKey);
  //   const provider = new ethers.providers.InfuraProvider('maticmum', infuraKey);

  //   const daiAddress = '0x0000000000000000000000000000000000001010';
  //   const daiAddress = '0x0000000000000000000000000000000000000000';
  //   const daiAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';

  //   const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

  //   homestead - Homestead (Mainnet)
  //   goerli - Görli (clique testnet)
  //   sepolia - Sepolia (proof-of-authority testnet)
  //   arbitrum - Arbitrum Optimistic L2
  //   arbitrum-goerli - Arbitrum Optimistic L2 testnet
  //   matic - Polgon mainnet
  //   maticmum - Polgon testnet
  //   optimism - Optimism Optimistic L2
  //   optimism-goerli - Optimism Optimistic L2 testnet
  const testChainIds = [56, 137, 10];

  const makeCalls = (
    tokenAddress: string,
    owner: string,
    id: number,
    tokenClassId: number
  ) => {
    const daiContract = new Contract(tokenAddress, erc20Abi);
    const daiBalanceCall = daiContract.balanceOf(owner);
    setCalls((arr) => [...arr, { helper: daiBalanceCall, id, tokenClassId }]);
  };
  const updateBanlance = () => {
    const prev = result.current;
    for (let i = 0; i < prev.length; i++) {
      const whitelists = prev[i].whitelists;
      prev[i].balance = whitelists.reduce(
        (acc, cur) => acc + Number(cur.banlance),
        0
      );
      prev[i].balanceUSD = whitelists.reduce(
        (acc, cur) => acc + Number(cur.banlanceUSD),
        0
      );
    }
  };
  const call = async (infuraKey: string, network: Chains) => {
    const provider = new ethers.providers.InfuraProvider(network, infuraKey);
    const ethcallProvider = new Provider(provider);

    await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor

    // const daiContract = new Contract(
    //   '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    //   erc20Abi
    // );

    // const ethBalanceCall = ethcallProvider.getEthBalance(address);
    // const daiBalanceCall = daiContract.balanceOf(address);
    const helpers = calls.map((item) => item.helper);

    const res = await ethcallProvider.all(helpers).catch((error) => {
      console.info(error);
    });
    console.info('multiCall: ', res);

    if (Array.isArray(res)) {
      for (let i = 0; i < res.length; i++) {
        const prev = result.current;
        const targetToken = prev.find(
          (item) => item.id === calls[i].tokenClassId
        );

        const targetChain = targetToken?.whitelists.find(
          (item) => item.id === calls[i].id
        );

        const bal = ethers.utils
          .formatUnits(res[i], targetChain?.tokenDecimal)
          .toString();
        targetChain.balance = bal;
        const banlance = FixedNumber.from(
          ethers.utils.formatUnits(res[i], targetChain?.tokenDecimal).toString()
        );

        FixedNumber.from(targetToken?.price).mulUnsafe(banlance);
        targetChain.balanceUSD = FixedNumber.from(targetToken?.price)
          .mulUnsafe(banlance)
          .toString();
      }
      updateBanlance();
    }
  };

  const calc = (tokenList: any[]) => {
    for (let i = 0; i < tokenList.length; i++) {
      const whitelists = tokenList[i].whitelists;
      if (whitelists) {
        for (let j = 0; j < whitelists.length; j++) {
          if (testChainIds.includes(whitelists[j].chainId)) {
            if (whitelists[j].chainId === chain?.id) {
              makeCalls(
                whitelists[j].tokenAddress,
                address,
                whitelists[j].id,
                whitelists[j].tokenClassId
              );
            }
          }
        }
      }
    }
    setIsDone(true);
  };

  useEffect(() => {
    if (isDone) {
      call(infuraKey, chain?.network);
    }
  }, [calls, isDone]);

  const handleCalc = () => {
    calc(tokenList);
  };

  return (
    <>
      <div>EOA: {address}</div>
      <div>
        Current Chain Name: <code>{chain?.name}</code>
      </div>
      <div>
        Current Chain Network:<code> {chain?.network}</code>
      </div>
      <div>
        Current Chain id: <code>{chain?.id}</code>
      </div>
      <Button onClick={handleCalc} disabled={isDisconnected}>
        Calculate banlance of current chain of the EOA
      </Button>
    </>
  );
};

export default ContractRead;
