import {
  add,
  format,
  getDate,
  getMonth,
  getYear,
  setDate,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
} from 'date-fns';

export const formatDate = (time: number) => {
  return format(time, 'dd.MM.yyyy');
};

export const roundMinutes = (time: number) => {
  return setMinutes(setSeconds(time, 0), 0);
};

export const setupDate = (
  date: Date,
  year: number,
  month: number,
  day: number
) => setDate(setMonth(setYear(date, year), month), day);

export const getNthDates = (duration: Duration, time = new Date()) => {
  const day = getDate(add(time, duration));

  const month = getMonth(add(time, duration));
  const year = getYear(add(time, duration));
  return [day, month, year];
};
