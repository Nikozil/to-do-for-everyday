import { Dispatch, FC, SetStateAction } from 'react';
import {
  getNthDates,
  setupDate,
} from '../../../../utils/TimeFunctions/TimeFunctions';
import { ShowCalendar } from '../../Calendar';
import styles from './NavQuick.module.scss';

const NavQuick: FC<Props> = ({
  date,
  changeShow,
  changeMonth,
  changeYear,
  changeDate,
}) => {
  const applyDate = (today: number, month: number, year: number) => {
    const newDate = setupDate(date, year, month, today);

    changeDate(newDate);
    changeMonth(newDate);
    changeYear(newDate);

    changeShow({
      showYearTable: false,
      showMonthTable: false,
      showDateTable: true,
      showHoursTable: false,
      showMinutesTable: false,
    });
  };

  const setTodayHandler = () => {
    const [today, month, year] = getNthDates({ days: 0 });

    applyDate(today, month, year);
  };

  const setTomorrowHandler = () => {
    const [tomorrow, month, year] = getNthDates({ days: 1 });

    applyDate(tomorrow, month, year);
  };
  const setWeekHandler = () => {
    const [day, month, year] = getNthDates({ days: 7 });

    applyDate(day, month, year);
  };

  const setMonthHandler = () => {
    const [day, month, year] = getNthDates({ months: 1 }, date);

    applyDate(day, month, year);
  };

  return (
    <div className={styles['quick-nav']}>
      <span className={styles['quick-nav__button']} onClick={setTodayHandler}>
        Сегодня
      </span>

      <span
        className={styles['quick-nav__button']}
        onClick={setTomorrowHandler}>
        Завтра
      </span>

      <span className={styles['quick-nav__button']} onClick={setWeekHandler}>
        Неделя
      </span>
      <span className={styles['quick-nav__button']} onClick={setMonthHandler}>
        Месяц
      </span>
    </div>
  );
};

export default NavQuick;

interface Props {
  date: Date;
  changeMonth: (date: Date) => void;
  changeYear: Dispatch<React.SetStateAction<Date>>;
  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
  changeDate: (date: Date) => void;
}
