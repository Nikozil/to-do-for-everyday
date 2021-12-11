import { AppStateType } from '../store';

export const selectAuthStatus = (state: AppStateType) => state.user.authStatus;

export const selectUser = (state: AppStateType) => state.user;

export const selectUserInitStatus = (state: AppStateType) =>
  state.user.initStatus;
