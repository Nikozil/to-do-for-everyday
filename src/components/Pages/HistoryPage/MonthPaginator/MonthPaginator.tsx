import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { getMonth, getYear } from 'date-fns';

import { AppStateType } from '../../../../Redux/store';
import { getDays } from '../../../../Redux/modules/historySlice';
import Paginator from '../../../../assets/Paginator/Paginator';
import styles from './MonthPaginator.module.scss';

const MonthPaginator = () => {
  const ReselectMonth = createSelector(
    (state: AppStateType) => state.clock.time,
    (time) => getMonth(time) + 1
  );
  const ReselectYear = createSelector(
    (state: AppStateType) => state.clock.time,
    (time) => getYear(time)
  );

  const currentMonth = useSelector(ReselectMonth);
  const currentYear = useSelector(ReselectYear);

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDays(month - 1, year));
  }, [month, year, dispatch]);

  const monthsLength = year === currentYear ? currentMonth : 12;
  const monthsNames = Array.from({ length: monthsLength }, (v, k) => k + 1);
  const yearsNames = Array.from(
    { length: currentYear - 2019 },
    (v, k) => 2020 + k
  );

  const monthHandler = (month: number) => {
    setMonth(month);
  };
  const yearHandler = (year: number) => {
    setYear(year);
  };

  return (
    <div className={styles.paginators}>
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
    </div>
  );
};

export default MonthPaginator;
