import React, { FC } from 'react';

interface IProps {}

import Styles from './style.module.css';

const Menu: FC<IProps> = (props) => {
  return (
    <div className={Styles.wrap}>
      <div className={Styles.menu}>
        <div className={Styles.item}>
          Products
          <div className={Styles.submenu}>
            <div className={Styles.dropdown}>
              <div className={Styles.dropdownItem}>
                dApp SDK
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                dappOS Wallet
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                dappOS Explorer
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                Mini-Program Platform
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.item}>
          Use Cases
          <div className={Styles.submenu}>
            <div className={Styles.dropdown}>
              <div className={Styles.dropdownItem}>
                dApps
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                Public chains
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                Currency and Payment
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.item}>
          Community
          <div className={Styles.submenu}>
            <div className={Styles.dropdown}>
              <div className={Styles.dropdownItem}>
                Join Community
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                Ambassador Program
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
              <div className={Styles.dropdownItem}>
                Bounties and Events
                <span className={`${Styles.icon} ${Styles.arrow}`}></span>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.item}>About</div>
        <div className={Styles.item}>Docs</div>
      </div>
    </div>
  );
};

export default Menu;
