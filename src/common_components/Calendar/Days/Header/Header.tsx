import { shortWeekDays } from '../../../../constants/clock';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <thead className={styles['header']}>
      <tr>
        {shortWeekDays.map((day) => (
          <th key={day} className={styles['week-day']}>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
