import React, { FC, useState, useEffect } from 'react';
import { useSignMessage, useAccount } from 'wagmi';

import { Button } from '@/components';
import { fibonacci } from '@/utils';
interface IProps {}

const SignMessage: FC<IProps> = (props) => {
  const msg = String(fibonacci(30));
  const { isConnected } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: msg,
  });

  return (
    <div>
      <div>
        <Button disabled={!isConnected} onClick={() => signMessage()}>
          Sign Message
        </Button>

        <div>
          Signature:
          <code>{isSuccess ? data : ''}</code>
        </div>

        {isError && <div>Error signing message</div>}
      </div>
    </div>
  );
};

export default SignMessage;
