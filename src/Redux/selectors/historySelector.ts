import { AppStateType } from '../store';

export const selectInitHistoryStatus = (state: AppStateType) =>
  state.history.initStatus;
