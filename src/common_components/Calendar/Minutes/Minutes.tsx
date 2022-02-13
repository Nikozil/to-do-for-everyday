import { setMinutes } from 'date-fns';
import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import Table from '../../Table/Table';
import { ShowCalendar } from '../Calendar';

const Minutes: FC<Props> = ({ date, changeDate, changeShow }) => {
  const minutes = [];

  for (let m = 0; m < 60; m = m + 5) {
    const minute = `0${m}`.slice(-2);
    minutes.push(minute);
  }

  const clickHandle: MouseEventHandler<HTMLTableSectionElement> = (e) => {
    const target = e.target as HTMLElement;
    const minutes = +target.innerText as number;

    if (minutes || minutes === 0) {
      const newDate = setMinutes(date, minutes);

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
      array={minutes}
      header={'Выберите минуты'}
      columns={3}
      clickHandle={clickHandle}
    />
  );
};

export default Minutes;

interface Props {
  date: Date;
  changeDate: (date: Date) => void;

  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
}
