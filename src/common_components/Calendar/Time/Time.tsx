import { format } from 'date-fns';
import { Dispatch, FC, SetStateAction } from 'react';
import { ShowCalendar } from '../Calendar';
import styles from './Time.module.scss';

const Time: FC<Props> = ({ date, clickHandler }) => {
  const hours = format(date, 'HH');
  const minutes = format(date, 'mm');

  const showHoursHandler = () => {
    clickHandler((prev: ShowCalendar) => ({
      showYearTable: false,
      showHoursTable: !prev.showHoursTable,
      showMinutesTable: false,
      showMonthTable: false,
      showDateTable:
        prev.showYearTable || prev.showMonthTable || prev.showMinutesTable
          ? false
          : !prev.showDateTable,
    }));
  };

  const showMinutesHandler = () => {
    clickHandler((prev: ShowCalendar) => ({
      showYearTable: false,
      showHoursTable: false,
      showMinutesTable: !prev.showMinutesTable,
      showMonthTable: false,
      showDateTable:
        prev.showYearTable || prev.showMonthTable || prev.showHoursTable
          ? false
          : !prev.showDateTable,
    }));
  };

  return (
    <div className={styles.time}>
      <span className={styles['time__button']} onClick={showHoursHandler}>
        {hours}
      </span>

      {':'}

      <span className={styles['time__button']} onClick={showMinutesHandler}>
        {minutes}
      </span>
    </div>
  );
};

export default Time;

interface Props {
  date: Date;
  clickHandler: Dispatch<SetStateAction<ShowCalendar>>;
}
