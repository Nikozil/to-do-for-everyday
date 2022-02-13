import { endOfToday, getTime } from 'date-fns';
import { createSelector } from 'reselect';
import { AppStateType } from '../store';

export const selectInitTasksStatus = (state: AppStateType) =>
  state.tasks.initStatus;

export const selectDoneTasks = (state: AppStateType) =>
  state.tasks.livedDay.doneTasksList;

export const selectScore = (state: AppStateType) => state.tasks.livedDay.score;

export const selectTag = (state: AppStateType) => state.tasks.livedDay.tag;

export const selectTomorrowTasks = createSelector(
  (state: AppStateType) => state.tasks.tasksList,
  (tasks) =>
    tasks
      .filter(
        (task) => !task.data.done && task.data.time > getTime(endOfToday())
      )
      .sort((task, nextTask) => task.data.time - nextTask.data.time)
);

export const selectCompletedTasks = createSelector(
  (state: AppStateType) => state.tasks.tasksList,
  (tasks) => tasks.filter((i) => i.data.done)
);

export const selectCurrentTasks = createSelector(
  (state: AppStateType) => state.tasks.tasksList,
  (tasks) =>
    tasks
      .filter(
        (task) => !task.data.done && task.data.time <= getTime(endOfToday())
      )
      .sort((task, nextTask) => task.data.time - nextTask.data.time)
);
