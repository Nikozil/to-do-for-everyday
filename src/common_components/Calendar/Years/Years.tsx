import { getYear, setYear } from 'date-fns';
import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import Table from '../../Table/Table';
import { ShowCalendar } from '../Calendar';
import styles from './Years.module.scss';

const Years: FC<Props> = ({ date, navYear, changeYear, changeShow }) => {
  const year = getYear(navYear);

  const years = [];
  for (let y = 0; y < 12; y++) {
    const newYear = year + y;
    years.push(newYear);
  }

  const clickHandle: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    const target = e.target as HTMLElement;
    const year = +target.innerText as number;

    if (year) {
      const newDate = setYear(date, year);
      changeYear(newDate);
      changeShow({
        showYearTable: false,
        showMonthTable: false,
        showHoursTable: false,
        showMinutesTable: false,
        showDateTable: true,
      });
    }
  };

  return (
    <Table
      array={years}
      header={'Выберите год'}
      columns={3}
      clickHandle={clickHandle}
      className={styles.year}
    />
  );
};

export default Years;

interface Props {
  date: Date;
  navYear: Date;
  changeYear: (date: Date) => void;
  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
}
