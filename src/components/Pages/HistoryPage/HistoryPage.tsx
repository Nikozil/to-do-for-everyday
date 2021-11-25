import React from 'react';
import { useSelector } from 'react-redux';

import { AppStateType } from '../../../Redux/store';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import DayComponent from './DayComponent/DayComponent';
import MonthPaginator from './MonthPaginator/MonthPaginator';
import styles from './HistoryPage.module.scss';

const HistoryPage = () => {
  const days = useSelector((state: AppStateType) => state.history.daysList);
  const initHistoryStatus = useSelector(
    (state: AppStateType) => state.history.initStatus
  );

  return (
    <div className={styles['history-page']}>
      <MonthPaginator />
      {initHistoryStatus ? (
        <ul className={styles['days-list']}>
          {days.length
            ? days.map((day) => <DayComponent key={day.timestamp} day={day} />)
            : null}
        </ul>
      ) : (
        <div className={styles['preloader']}>
          <SpinComponent styleClass={styles['preloader__spinner']} />
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
