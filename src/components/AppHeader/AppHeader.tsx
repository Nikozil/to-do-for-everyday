import React, { useEffect } from 'react';
import ClockComponent from './ClockComponent/ClockComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';
import { startClock, stopClock } from '../../Redux/modules/clockSlice';
import { AppStateType } from '../../Redux/store';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  const user = useSelector((state: AppStateType) => state.user);
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startClock());
    return () => {
      dispatch(stopClock());
    };
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.pagename}>{PageNames[pathname]}</div>
      <ClockComponent />
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
