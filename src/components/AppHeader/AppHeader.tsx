import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { PageNames } from '../../constants/pageNames';
import { startClock, stopClock } from '../../Redux/modules/clockSlice';
import { AppStateType } from '../../Redux/store';
import styles from './AppHeader.module.scss';
import { format, getDay } from 'date-fns';
import { days } from '../../constants/clock';

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
  const time = useSelector((state: AppStateType) => state.clock.time);

  return (
    <header className={styles.header}>
      <div className={styles.pagename}>{PageNames[pathname]}</div>
      <div className={styles.clock}>
        <div className={styles['clock__date']}>
          {`${days[getDay(time)]}, `}
          {time ? format(time, 'dd.MM.yyyy') : null}
        </div>
        <div className={styles['clock__time']}>
          {' '}
          {time ? format(time, 'HH:mm') : null}
        </div>
      </div>
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
