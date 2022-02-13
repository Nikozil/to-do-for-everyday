import { startOfMonth, startOfYear } from 'date-fns';
import { useState } from 'react';
import styles from './Calendar.module.scss';
import Days from './Days/Days';
import Hours from './Hours/Hours';
import Minutes from './Minutes/Minutes';
import Months from './Months/Months';
import Navigate from './Navigate/Navigate';
import Time from './Time/Time';
import Years from './Years/Years';

const Calendar: React.FC<Props> = ({ date, setDate }) => {
  const [navDate, setNavDate] = useState(startOfMonth(date));
  const [navYear, setNavYear] = useState(startOfYear(date));

  const [show, setShow] = useState({
    showDateTable: true,
    showMonthTable: false,
    showYearTable: false,
    showHoursTable: false,
    showMinutesTable: false,
  });

  return (
    <div className={styles['calendar']}>
      <Navigate
        date={date}
        navDate={navDate}
        show={show}
        changeShow={setShow}
        changeMonth={setNavDate}
        changeYear={setNavYear}
        changeDate={setDate}
      />

      <div className={styles['calendar__content']}>
        {show.showMonthTable && (
          <Months
            date={navDate}
            changeMonth={setNavDate}
            changeShow={setShow}
          />
        )}

        {show.showYearTable && (
          <Years
            date={navDate}
            navYear={navYear}
            changeYear={setNavDate}
            changeShow={setShow}
          />
        )}

        {show.showHoursTable && (
          <Hours date={date} changeDate={setDate} changeShow={setShow} />
        )}

        {show.showMinutesTable && (
          <Minutes date={date} changeDate={setDate} changeShow={setShow} />
        )}

        {show.showDateTable && (
          <Days date={date} navDate={navDate} changeDate={setDate} />
        )}
      </div>

      <Time date={date} clickHandler={setShow} />
    </div>
  );
};

export default Calendar;

export interface ShowCalendar {
  showYearTable: boolean;
  showMonthTable: boolean;
  showDateTable: boolean;
  showHoursTable: boolean;
  showMinutesTable: boolean;
}

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}
