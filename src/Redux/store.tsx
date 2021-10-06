import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import reduxThunk, { ThunkAction } from 'redux-thunk';
import userSlice from './modules/userReducer';

const reducer = {
  user: userSlice.reducer,
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
