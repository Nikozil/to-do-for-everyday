import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './NavLinkComponent.module.scss';
import cn from 'classnames';

const NavLinkComponent: React.FC<NavLinkProps> = ({ link, Icon }) => {
  return (
    <NavLink
      aria-label={link}
      to={link}
      className={cn(styles.navlink, 'btn', 'btn-secondary')}
      activeClassName={styles['navlink_selected']}>
      <Icon className={styles['navlink__button-icon']} />
    </NavLink>
  );
};
export default NavLinkComponent;
interface NavLinkProps {
  link: string;
  Icon: React.FC<{ className: string }>;
}
