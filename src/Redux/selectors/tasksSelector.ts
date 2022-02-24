import {
  endOfDay,
  endOfMonth,
  endOfToday,
  getTime,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { createSelector } from 'reselect';
import { AppStateType } from '../store';

export const selectInitTasksStatus = (state: AppStateType) =>
  state.tasks.initStatus;

export const selectDoneTasks = (state: AppStateType) =>
  state.tasks.livedDay.doneTasksList;

export const selectScore = (state: AppStateType) => state.tasks.livedDay.score;

export const selectTag = (state: AppStateType) => state.tasks.livedDay.tag;

export const selectFutureTasks = createSelector(
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

export const selectNthDateTasks = (date: number) =>
  createSelector(
    (state: AppStateType) => state.tasks.tasksList,
    (tasks) =>
      tasks
        .filter(
          (task: any) =>
            getTime(endOfDay(task.data.time)) === getTime(endOfDay(date))
        )
        .sort((task, nextTask) => task.data.time - nextTask.data.time)
  );

export const selectNthMonthTasks = (date: number) =>
  createSelector(
    (state: AppStateType) => state.tasks.tasksList,
    (tasks) => {
      const nextMonthStartTime = startOfMonth(date);
      const nextMonthEndTime = endOfMonth(date);

      return tasks
        .filter(
          (task: any) =>
            getTime(startOfDay(task.data.time)) >=
              getTime(startOfDay(nextMonthStartTime)) &&
            getTime(endOfDay(task.data.time)) <=
              getTime(endOfDay(nextMonthEndTime))
        )
        .sort((task, nextTask) => task.data.time - nextTask.data.time);
    }
  );

export const selectOlderThenMonthTasks = (date: number) =>
  createSelector(
    (state: AppStateType) => state.tasks.tasksList,
    (tasks) => {
      const nextMonthEndTime = endOfMonth(date);

      return tasks
        .filter(
          (task) =>
            getTime(startOfDay(task.data.time)) >=
            getTime(endOfDay(nextMonthEndTime))
        )
        .sort((task, nextTask) => task.data.time - nextTask.data.time);
    }
  );
