import React from 'react';
import { useSelector } from 'react-redux';
import { days } from '../../../constants/clock';
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
      <div className={styles['clock__date']}>
        {`${days[day]}, `}
        {time ? date : null}
      </div>
      <div className={styles['clock__time']}> {time ? time : null}</div>
    </div>
  );
};

export default ClockComponent;
