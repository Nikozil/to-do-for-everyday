import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';
import { startClock, stopClock } from '../../Redux/modules/clockSlice';
import { selectUser } from '../../Redux/selectors/userSelector';
import styles from './AppHeader.module.scss';
import ClockComponent from './ClockComponent/ClockComponent';

const AppHeader = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const pathname = useLocation().pathname;

  useEffect(() => {
    dispatch(startClock());
    return () => {
      dispatch(stopClock());
    };
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles['header__pagename']}>{PageNames[pathname]}</div>
      <ClockComponent />
      <div className={styles.usermenu}>
        <Link to="/settings" className={styles['usermenu__username']}>
          {user.authStatus
            ? user.userData.displayName || user.userData.email
            : 'Аноним'}
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
