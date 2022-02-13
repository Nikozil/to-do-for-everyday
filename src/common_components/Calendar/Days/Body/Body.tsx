import { getDaysInMonth, getISODay, startOfMonth } from 'date-fns';
import {
  getCellsfromArray,
  getDaysCellsArray,
  getRowsArray,
  getTable,
} from '../../../../utils/TableFunctions/TableFunctions';
import styles from './Body.module.scss';

const Body: React.FC<Props> = ({ date, navDate }) => {
  const startMonth = startOfMonth(navDate);

  const daysInMonth = getDaysInMonth(startMonth);
  const weekDay = getISODay(startMonth);

  const blanksArray = [];
  for (let y = 0; y < weekDay - 1; y++) {
    blanksArray.push('');
  }

  let blanks = getCellsfromArray(blanksArray, styles['days__empty']);

  let days = getDaysCellsArray(
    1,
    daysInMonth,
    1,
    date,
    navDate,
    styles['days__day'],
    styles['days__day_selected'],
    styles['days__day_current'],
    styles['days__cell']
  );

  const totalSlots = [...blanks, ...days];

  const rows = getRowsArray(totalSlots, 7);
  const table = getTable(rows);

  return <>{table}</>;
};

export default Body;

interface Props {
  date: Date;
  navDate: Date;
}
