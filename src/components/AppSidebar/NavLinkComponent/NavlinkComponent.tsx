import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './NavLinkComponent.module.scss';
const cn = require('classnames');

const NavLinkComponent: React.FC<NavLinkProps> = ({ link, Icon }) => {
  return (
    <NavLink
      to={link}
      className={cn(styles.navlink, 'btn', 'btn-secondary')}
      activeClassName={styles.selected}>
      <Icon className={styles['button-icon']} />
    </NavLink>
  );
};
export default NavLinkComponent;
interface NavLinkProps {
  link: string;
  Icon: React.FC<{ className: string }>;
}
