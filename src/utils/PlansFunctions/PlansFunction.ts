import {
  add,
  endOfMonth,
  getDate,
  getDay,
  getMonth,
  getTime,
  setDate,
} from 'date-fns';
import { months, weekDays } from '../../constants/clock';
import {
  selectNthDateTasks,
  selectOlderThenMonthTasks,
} from '../../Redux/selectors/tasksSelector';

export const getPlan = (time: number, days: number) => {
  const date = getTime(setDate(time, days));
  const numDate = getDate(date);
  const day = getDay(date);

  const selector = selectNthDateTasks(date);

  const formatDate = `${numDate}`;

  const title = `${weekDays[day]}`;

  return { date: formatDate, title: title, selector: selector };
};

export const getTomorrowPlan = (time: number) => {
  const tomorrowTime = getTime(add(time, { days: 1 }));
  const tomorrowDay = getDay(tomorrowTime);
  const date = getDate(tomorrowTime);

  const selectTomorrowTasks = selectNthDateTasks(tomorrowTime);

  return {
    date: `${date}`,
    title: `${weekDays[tomorrowDay]}, Завтра`,
    selector: selectTomorrowTasks,
  };
};

export const getCurrentMonthPlan = (time: number) => {
  const futureDays = [];

  const overmorrow = getDate(add(time, { days: 2 }));
  const endMonth = getDate(endOfMonth(time));

  for (let d = overmorrow; d <= endMonth; d++) {
    futureDays.push(getPlan(time, d));
  }

  return futureDays;
};

export const getNextMonthPlan = (time: number) => {
  const nextMonthTime = getTime(add(time, { months: 1 }));

  const month = getMonth(nextMonthTime);

  const selectNextMonthTasks = selectNthDateTasks(nextMonthTime);

  return {
    date: '',
    title: `${months[month]}`,
    selector: selectNextMonthTasks,
  };
};

export const getOlderTwoMonthsPlan = (time: number) => {
  const nextMonthTime = getTime(add(time, { months: 1 }));

  const selectOlderTasks = selectOlderThenMonthTasks(nextMonthTime);

  return {
    date: '',
    title: 'Когда-нибудь',
    selector: selectOlderTasks,
  };
};

export const getPlans = (time: number) => {
  const tomorrow = getTomorrowPlan(time);

  const futureDays = getCurrentMonthPlan(time);

  const nextMonth = getNextMonthPlan(time);

  const older = getOlderTwoMonthsPlan(time);

  return [tomorrow, ...futureDays, nextMonth, older];
};
