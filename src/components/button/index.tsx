import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

import Styles from './style.module.scss';

interface IProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

type NativeButtonProps = IProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <div className={Styles.button} {...restProps}>
      {children}
    </div>
  );
};

export default Button;
