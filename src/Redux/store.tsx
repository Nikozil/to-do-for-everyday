import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import reduxThunk, { ThunkAction } from 'redux-thunk';
import tasksSlice from './modules/tasksSlice';
import userSlice from './modules/userSlice';

const reducer = {
  user: userSlice.reducer,
  tasks: tasksSlice.reducer,
};

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>;

const store = configureStore({
  reducer,
  middleware: [reduxThunk],
});
export default store;
