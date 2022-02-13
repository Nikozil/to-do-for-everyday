import { Dispatch, FC, SetStateAction } from 'react';
import { ShowCalendar } from '../Calendar';
import NavDates from './NavDates/NavDates';
import styles from './Navigate.module.scss';
import NavQuick from './NavQuick/NavQuick';

const Navigate: FC<Props> = ({
  date,
  navDate,
  show,
  changeShow,
  changeMonth,
  changeYear,
  changeDate,
}) => (
  <div className={styles.nav}>
    <NavQuick
      date={date}
      changeShow={changeShow}
      changeMonth={changeMonth}
      changeYear={changeYear}
      changeDate={changeDate}
    />

    <NavDates
      navDate={navDate}
      show={show}
      changeShow={changeShow}
      changeMonth={changeMonth}
      changeYear={changeYear}
    />
  </div>
);
export default Navigate;

interface Props {
  date: Date;
  navDate: Date;
  show: ShowCalendar;

  changeMonth: (date: Date) => void;
  changeYear: Dispatch<React.SetStateAction<Date>>;

  changeShow: Dispatch<SetStateAction<ShowCalendar>>;
  changeDate: (date: Date) => void;
}
