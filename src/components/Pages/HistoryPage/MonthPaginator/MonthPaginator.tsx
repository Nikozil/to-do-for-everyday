import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../../../../assets/Paginator/Paginator';
import { getDays } from '../../../../Redux/modules/historySlice';
import {
  selectMonth,
  selectYear,
} from '../../../../Redux/selectors/clockSelector';
import styles from './MonthPaginator.module.scss';

const MonthPaginator = () => {
  const dispatch = useDispatch();

  const currentMonth = useSelector(selectMonth);

  const currentYear = useSelector(selectYear);

  const [month, setMonth] = useState(currentMonth);

  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    dispatch(getDays(month - 1, year));
  }, [month, year, dispatch]);

  const monthsLength = year === currentYear ? currentMonth : 12;

  const monthsNames = Array.from(
    { length: monthsLength },
    (v, monthIndex) => monthIndex + 1
  );

  const yearsNames = Array.from(
    { length: currentYear - 2019 },
    (v, yearIndex) => 2020 + yearIndex
  );

  const monthHandler = (month: number) => {
    setMonth(month);
  };
  const yearHandler = (year: number) => {
    setYear(year);
  };

  return (
    <header className={styles.paginators}>
      <Paginator
        pageNames={yearsNames}
        currentPage={year}
        clickHandler={yearHandler}
      />
      <Paginator
        pageNames={monthsNames}
        currentPage={month}
        clickHandler={monthHandler}
      />
    </header>
  );
};

export default MonthPaginator;
