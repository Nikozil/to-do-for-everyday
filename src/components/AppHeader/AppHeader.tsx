import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLinks } from '../../constants/pageNames';
import { signOut } from '../../Redux/modules/userReducer';
import { AppStateType } from '../../Redux/store';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const user = useSelector((state: AppStateType) => state.user.user);
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();

  const signoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(signOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.pagename}>
        {NavLinks.find((i) => i.link === pathname)?.nameRus}
      </div>
      <div className={styles.usermenu}>
        <div className={styles.username}>
          {user ? user.displayName || user.email : 'Аноним'}
        </div>
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
