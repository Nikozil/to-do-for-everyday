import React from 'react';
import { useDispatch } from 'react-redux';
import { singOut } from '../../Redux/userReducer';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(singOut());
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
