import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTime } from 'date-fns';
import { AppThunk } from '../store';

export let initialState = {
  date: null as number | null,
  interval: undefined as number | undefined,
};

export type initialStateType = typeof initialState;
const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    TICK: (state) => {
      return {
        ...state,
        date: getTime(new Date()),
      };
    },
    setClockInterval: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        interval: action.payload,
      };
    },
  },
});

export const { TICK, setClockInterval } = clockSlice.actions;

export const startClock = (): AppThunk => (dispatch, getState) => {
  dispatch(stopClock());

  const interval = setInterval(() => {
    dispatch(TICK());
  }, 10);

  dispatch(setClockInterval(interval));
};
export const stopClock = (): AppThunk => (dispatch, getState) => {
  clearInterval(getState().clock.interval);
  dispatch(setClockInterval(null));
};

export default clockSlice;
