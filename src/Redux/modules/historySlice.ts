import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endOfMonth, getTime, startOfMonth } from 'date-fns';

import { StoreAPI } from '../../api/StoreAPI';
import { AppThunk } from '../store';
import { LivedDay } from './tasksSlice';

export const initialState = {
  daysList: [] as HistoryDay[],
  initStatus: false as boolean,
};

export type initialStateType = typeof initialState;
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setDays: (state, action: PayloadAction<HistoryDay[]>) => {
      return { ...state, daysList: action.payload };
    },
    setInitStatus: (state, action: PayloadAction<boolean>) => {
      state.initStatus = action.payload;
    },
  },
});

export const { setDays, setInitStatus } = historySlice.actions;

export const getDays =
  (month: number, year: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setInitStatus(false));
      const date = getTime(new Date(year, month));
      const start = getTime(startOfMonth(date));
      const end = getTime(endOfMonth(date));

      const days = await StoreAPI.getDays(start, end);
      if (!days) throw new Error('Не удалось получить данные');

      dispatch(setDays(days));
      dispatch(setInitStatus(true));
    } catch (err: any) {
      return err.message as string;
    }
  };

export default historySlice;

export interface HistoryDay extends LivedDay {
  timestamp: number;
}
