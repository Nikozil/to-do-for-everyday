import React from 'react';
import { format, getDay } from 'date-fns';
import { days } from '../../../constants/clock';
import { createSelector } from 'reselect';
import styles from './ClockComponent.module.scss';
import { AppStateType } from '../../../Redux/store';
import { useSelector } from 'react-redux';

const ClockComponent = () => {
  const ReselectTime = createSelector(
    (state: AppStateType) => state.clock.time,

    (time) => format(time, 'HH:mm')
  );
  const ReselectDate = createSelector(
    (state: AppStateType) => state.clock.time,
    (time) => format(time, 'dd.MM.yyyy')
  );
  const ReselectDay = createSelector(
    (state: AppStateType) => state.clock.time,
    (time) => getDay(time)
  );
  const time = useSelector(ReselectTime);
  const date = useSelector(ReselectDate);
  const day = useSelector(ReselectDay);
  return (
    <div className={styles.clock}>
      <div className={styles['clock__date']}>
        {`${days[day]}, `}
        {time ? date : null}
      </div>
      <div className={styles['clock__time']}> {time ? time : null}</div>
    </div>
  );
};

export default ClockComponent;
