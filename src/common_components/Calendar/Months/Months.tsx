import { setMonth } from 'date-fns';
import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import { months } from '../../../constants/clock';
import Table from '../../Table/Table';
import { ShowCalendar } from '../Calendar';
import styles from './Months.module.scss';

const Months: FC<Props> = ({ date, changeMonth, changeShow }) => {
  const clickHandle: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    const target = e.target as HTMLElement;
    const monthName = target.innerText;

    if (monthName) {
      const month = months.indexOf(monthName);

      const newDate = setMonth(date, month);
      changeMonth(newDate);
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
      array={months}
      header={'Выберите месяц'}
      columns={3}
      clickHandle={clickHandle}
      className={styles.month}
    />
  );
};

export default Months;

interface Props {
  date: Date;
  changeMonth: (date: Date) => void;
  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
}
