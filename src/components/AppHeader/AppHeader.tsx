import React, { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';
import { signOut } from '../../Redux/modules/userReducer';
import { AppStateType } from '../../Redux/store';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const user = useSelector((state: AppStateType) => state.user.user);
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    if (user) console.log('header', user.displayName);
  }, [user]);

  const signoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(signOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.pagename}>{PageNames[pathname]}</div>
      <div className={styles.usermenu}>
        <Link to="/settings" className={styles.username}>
          {user ? user.displayName || user.email : 'Аноним'}
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
