import React from 'react';

import Logo from '../../assets/Logo.png';
import { NavLinks } from '../../constants/pageNames';
import styles from './AppSidebar.module.scss';
import NavLinkComponent from './NavLinkComponent/NavlinkComponent';

const AppSidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} alt="" />
      </div>

      <nav className={styles.navbar}>
        {NavLinks.map((i) => (
          <NavLinkComponent link={i.link} Icon={i.Icon} key={i.link} />
        ))}
      </nav>
    </div>
  );
};

export default AppSidebar;
