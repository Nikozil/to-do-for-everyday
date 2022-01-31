import React from 'react';
import { useSelector } from 'react-redux';
import SpinComponent from '../../../common_components/SpinComponent/SpinComponent';
import { selectInitHistoryStatus } from '../../../Redux/selectors/historySelector';
import { AppStateType } from '../../../Redux/store';
import DayComponent from './DayComponent/DayComponent';
import styles from './HistoryPage.module.scss';
import MonthPaginator from './MonthPaginator/MonthPaginator';

const HistoryPage = () => {
  const days = useSelector((state: AppStateType) => state.history.daysList);

  const initHistoryStatus = useSelector(selectInitHistoryStatus);

  return (
    <section className={styles['history-page']}>
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
    </section>
  );
};

export default HistoryPage;
