import { createSelector } from 'reselect';
import { AppStateType } from '../store';
import { endOfDay, format, getDay, getMonth, getTime, getYear } from 'date-fns';

export const selectEndOfDay = createSelector(
  (state: AppStateType) => state.clock.time,
  (time) => getTime(endOfDay(time))
);

export const selectTime = createSelector(
  (state: AppStateType) => state.clock.time,

  (time) => format(time, 'HH:mm')
);

export const selectDate = createSelector(
  (state: AppStateType) => state.clock.time,
  (time) => format(time, 'dd.MM.yyyy')
);

export const selectDay = createSelector(
  (state: AppStateType) => state.clock.time,
  (time) => getDay(time)
);

export const selectMonth = createSelector(
  (state: AppStateType) => state.clock.time,
  (time) => getMonth(time) + 1
);

export const selectYear = createSelector(
  (state: AppStateType) => state.clock.time,
  (time) => getYear(time)
);
