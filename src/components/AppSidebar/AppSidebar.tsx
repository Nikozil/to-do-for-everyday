import React from 'react';

import Logo from '../../assets/Logo.png';
import { NavLinksEnd, NavLinksStart } from '../../constants/pageNames';
import NavLinkComponent from './NavLinkComponent/NavlinkComponent';
import styles from './AppSidebar.module.scss';

const AppSidebar: React.FC = () => {
  const mapNavLinkComponent = (link: any) => (
    <NavLinkComponent
      link={link.link}
      Icon={link.Icon}
      key={link.link}
      name={link.nameRus}
    />
  );

  return (
    <aside className={styles.sidebar}>
      <header className={styles.logo}>
        <div className={styles['logo__icon']}>
          <img src={Logo} alt="Logo" />
        </div>
        <span className={styles['logo__name']}>To Do for everyday</span>
      </header>
      <nav className={styles.navbar}>
        <div className={styles['navbar__links']}>
          {NavLinksStart.map((link) => (
            <NavLinkComponent
              link={link.link}
              Icon={link.Icon}
              key={link.link}
              name={link.nameRus}
            />
          ))}
        </div>
        <div className={styles['navbar__links']}>
          {NavLinksEnd.map(mapNavLinkComponent)}
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;
