import React, { FC } from 'react';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
} from 'wagmi';

import { Button } from '@/components';
import ABI from '@/contract/vwmanager.json';
import { CONTRACT_ADDRESS_MAP } from '@/const';

interface IProps {}

const ContractWrite: FC<IProps> = (props) => {
  const { chain } = useNetwork();

  const { address } = useAccount();

  const { config, error } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS_MAP[chain.name],
    abi: ABI,
    functionName: 'createWallet',
    args: [address],
  });
  const { data, write } = useContractWrite(config);
  console.log(data);

  return (
    <>
      <Button disabled={!write} onClick={() => write?.()}>
        Create Wallet
      </Button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
      <div>
        Account Address: <code>{data ? JSON.stringify(data) : null}</code>
      </div>
    </>
  );
};

export default ContractWrite;
