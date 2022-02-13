import { getMonth, getYear } from 'date-fns';
import { MouseEventHandler } from 'react';
import { setupDate } from '../../../utils/TimeFunctions/TimeFunctions';

import Body from './Body/Body';
import Header from './Header/Header';

import styles from './Days.module.scss';

const Days: React.FC<Props> = ({ date, navDate, changeDate }) => {
  const month = getMonth(navDate);
  const year = getYear(navDate);

  const clickHandle: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    const target = e.target as HTMLElement;
    const day = +target.innerText as number;

    if (day) {
      const newDate = setupDate(date, year, month, day);
      changeDate(newDate);
    }
  };

  return (
    <table className={styles.table}>
      <Header />

      <tbody onClick={clickHandle} className={styles.tbody}>
        <Body date={date} navDate={navDate} />
      </tbody>
    </table>
  );
};

export default Days;

interface Props {
  date: Date;
  navDate: Date;
  changeDate: (date: Date) => void;
}
