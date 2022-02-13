import {
  add,
  format,
  getDate,
  getMonth,
  getYear,
  setDate,
  setMonth,
  setYear,
} from 'date-fns';

export const formatDate = (time: number) => {
  return format(time, 'dd.MM.yyyy');
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
