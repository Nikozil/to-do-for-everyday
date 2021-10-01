import React from 'react';
import { AiFillCheckCircle, AiOutlineBorderlessTable } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import styles from './AppSidebar.module.scss';

const cn = require('classnames');
const AppSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} alt="" />
      </div>

      <nav>
        <NavLink
          to="/checkList"
          className={styles.navbar}
          activeClassName={styles.selected}>
          <button
            type="button"
            className={cn(styles.button, 'btn', 'btn-secondary')}>
            <AiFillCheckCircle className={styles.ibutton} />
          </button>
        </NavLink>
        <NavLink
          to="/table"
          className={styles.navbar}
          activeClassName={styles.selected}>
          <button
            type="button"
            className={cn(styles.button, 'btn', 'btn-secondary')}>
            <AiOutlineBorderlessTable className={styles.ibutton} />
          </button>
        </NavLink>
      </nav>
    </div>
  );
};

export default AppSidebar;
