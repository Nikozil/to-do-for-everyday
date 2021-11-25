import React from 'react';

import Logo from '../../assets/Logo.png';
import { NavLinksEnd, NavLinksStart } from '../../constants/pageNames';
import NavLinkComponent from './NavLinkComponent/NavlinkComponent';
import styles from './AppSidebar.module.scss';

const AppSidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className={styles.navbar}>
        <nav className={styles['navbar__links']}>
          {NavLinksStart.map((i) => (
            <NavLinkComponent link={i.link} Icon={i.Icon} key={i.link} />
          ))}
        </nav>
        <nav className={styles['navbar__links']}>
          {NavLinksEnd.map((i) => (
            <NavLinkComponent link={i.link} Icon={i.Icon} key={i.link} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppSidebar;
