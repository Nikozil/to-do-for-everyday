import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../Redux/modules/userReducer';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.username}>UserName</div>
      <div className={styles.login}>
        <button onClick={signoutHandler}>Sign out</button>
      </div>
    </header>
  );
};

export default AppHeader;
