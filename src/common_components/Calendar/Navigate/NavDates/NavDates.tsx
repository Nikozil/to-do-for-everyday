import { add, getMonth, getYear, sub } from 'date-fns';
import { Dispatch, FC, SetStateAction } from 'react';
import { months } from '../../../../constants/clock';
import { NextButton, PrevButton } from '../../../Buttons/Buttons';
import { ShowCalendar } from '../../Calendar';
import styles from './NavDates.module.scss';

const NavDates: FC<Props> = ({
  navDate,
  show,
  changeShow,
  changeMonth,
  changeYear,
}) => {
  const month = getMonth(navDate);
  const year = getYear(navDate);

  const nextHandler = () => {
    if (show.showDateTable) {
      const newDate = add(navDate, { months: 1 });
      changeMonth(newDate);
    }

    if (show.showYearTable) {
      changeYear((prev: Date) => add(prev, { years: 12 }));
    }
  };

  const prevHandler = () => {
    if (show.showDateTable) {
      const newDate = sub(navDate, { months: 1 });
      changeMonth(newDate);
    }

    if (show.showYearTable) {
      changeYear((prev: Date) => sub(prev, { years: 12 }));
    }
  };

  const showMonthHandler = () => {
    changeShow((prev: ShowCalendar) => ({
      showYearTable: false,
      showHoursTable: false,
      showMinutesTable: false,
      showMonthTable: !prev.showMonthTable,
      showDateTable:
        prev.showYearTable || prev.showHoursTable || prev.showMinutesTable
          ? false
          : !prev.showDateTable,
    }));
  };

  const showYearHandler = () => {
    changeShow((prev: ShowCalendar) => ({
      showYearTable: !prev.showYearTable,
      showMonthTable: false,
      showHoursTable: false,
      showMinutesTable: false,
      showDateTable:
        prev.showMonthTable || prev.showHoursTable || prev.showMinutesTable
          ? false
          : !prev.showDateTable,
    }));

    if (show.showYearTable) {
      changeYear(navDate);
    }
  };

  return (
    <div className={styles['dates']}>
      <PrevButton
        className={styles['dates__button']}
        clickHandler={prevHandler}
      />

      <span className={styles['dates__button']} onClick={showMonthHandler}>
        {months[month]}
      </span>

      <span className={styles['dates__button']} onClick={showYearHandler}>
        {year}
      </span>

      <NextButton
        className={styles['dates__button']}
        clickHandler={nextHandler}
      />
    </div>
  );
};

export default NavDates;

interface Props {
  navDate: Date;
  show: ShowCalendar;
  changeMonth: (date: Date) => void;
  changeYear: Dispatch<React.SetStateAction<Date>>;
  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
}
