import React from 'react';

import Logo from '../../assets/Logo.png';
import { NavLinksEnd, NavLinksStart } from '../../constants/pageNames';
import styles from './AppSidebar.module.scss';
import NavLinkComponent from './NavLinkComponent/NavlinkComponent';

const AppSidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className={styles.navbar}>
        <nav className={styles.navs}>
          {NavLinksStart.map((i) => (
            <NavLinkComponent link={i.link} Icon={i.Icon} key={i.link} />
          ))}
        </nav>
        <nav className={styles.navs}>
          {NavLinksEnd.map((i) => (
            <NavLinkComponent link={i.link} Icon={i.Icon} key={i.link} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;
