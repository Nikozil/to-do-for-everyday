import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';
import { AppStateType } from '../../Redux/store';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const user = useSelector((state: AppStateType) => state.user);
  const pathname = useLocation().pathname;

  return (
    <header className={styles.header}>
      <div className={styles.pagename}>{PageNames[pathname]}</div>
      <div className={styles.usermenu}>
        <Link to="/settings" className={styles.username}>
          {user.authStatus
            ? user.userData.displayName || user.userData.email
            : 'Аноним'}
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
