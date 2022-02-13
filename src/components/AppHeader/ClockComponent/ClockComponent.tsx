import React from 'react';
import { useSelector } from 'react-redux';
import { weekDays } from '../../../constants/clock';
import {
  selectDate,
  selectDay,
  selectTime,
} from '../../../Redux/selectors/clockSelector';
import styles from './ClockComponent.module.scss';

const ClockComponent = () => {
  const time = useSelector(selectTime);

  const date = useSelector(selectDate);

  const day = useSelector(selectDay);

  return (
    <div className={styles.clock}>
      <time className={styles['clock__date']}>
        {`${weekDays[day]}, `}
        {time ? date : null}
      </time>
      <time className={styles['clock__time']}> {time ? time : null}</time>
    </div>
  );
};

export default ClockComponent;
