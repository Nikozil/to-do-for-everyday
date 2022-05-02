import { setHours } from 'date-fns';
import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import Table from '../../Table/Table';
import { ShowCalendar } from '../Calendar';
import styles from './Hours.module.scss';

const Hours: FC<Props> = ({ date, changeDate, changeShow }) => {
  const hours = [];

  for (let h = 0; h < 24; h++) {
    const hour = `0${h}`.slice(-2);
    hours.push(hour);
  }

  const clickHandle: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    const target = e.target as HTMLElement;
    const hours = +target.innerText as number;

    if (hours || hours === 0) {
      const newDate = setHours(date, hours);
      changeDate(newDate);
      changeShow({
        showYearTable: false,
        showMonthTable: false,
        showDateTable: true,
        showHoursTable: false,
        showMinutesTable: false,
      });
    }
  };

  return (
    <Table
      array={hours}
      header={'Выберите час'}
      columns={6}
      clickHandle={clickHandle}
      className={styles.hour}
    />
  );
};

export default Hours;

interface Props {
  date: Date;
  changeDate: (date: Date) => void;

  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
}
