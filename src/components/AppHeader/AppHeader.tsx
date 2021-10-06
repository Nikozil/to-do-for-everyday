import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';
import { signOut } from '../../Redux/modules/userReducer';
import { AppStateType } from '../../Redux/store';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const user = useSelector((state: AppStateType) => state.user);
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();

  const signoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(signOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.pagename}>{PageNames[pathname]}</div>
      <div className={styles.usermenu}>
        <Link to="/settings" className={styles.username}>
          {user.authStatus
            ? user.userData.displayName || user.userData.email
            : 'Аноним'}
        </Link>
        <button
          className={'btn btn-secondary btn-sm mx-1'}
          onClick={signoutHandler}>
          Выйти
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
