import React, { FC, useState } from 'react';
import { recoverMessageAddress } from 'viem';

import { Button } from '@/components';

import Styles from './style.module.css';

interface IProps {}

const RecoverMessage: FC<IProps> = (props) => {
  const [address, setAddress] = useState('');
  const message = 'Hello dappOS!';
  const signature =
    '0x21274cf4feb82a73be6100731b48d074f566f166376eee703dc0170353c7224e2a573af2d795deb28eef8d52aaf2621eac58312f07d9179178dd39bd11c61c271b';

  const recoverMessage = async () => {
    const address = await recoverMessageAddress({
      message,
      signature,
    });

    setAddress(address);
  };

  return (
    <div className={Styles.wrapper}>
      <Button onClick={recoverMessage}>Recover Message</Button>
      <div>
        Address: <code>{address}</code>
      </div>
    </div>
  );
};

export default RecoverMessage;
