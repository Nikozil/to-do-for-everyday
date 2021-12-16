import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './NavLinkComponent.module.scss';
import cn from 'classnames';

const NavLinkComponent: React.FC<NavLinkProps> = ({ link, Icon, name }) => {
  return (
    <NavLink
      aria-label={link}
      to={link}
      className={styles.navlink}
      activeClassName={styles['navlink_selected']}>
      <div className={cn(styles['navlink__button'], 'btn', 'btn-secondary')}>
        <Icon className={styles['navlink__button-icon']} />
      </div>
      <span className={styles['navlink__button-name']}>{name}</span>
    </NavLink>
  );
};
export default NavLinkComponent;
export interface NavLinkProps {
  link: string;
  Icon: React.FC<{ className: string }>;
  name: string;
}
