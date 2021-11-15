import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  add,
  endOfToday,
  format,
  getTime,
  milliseconds,
  startOfDay,
} from 'date-fns';

import { StoreAPI } from '../../api/StoreAPI';
import { AppThunk } from '../store';

export const initialState = {
  tasksList: [] as Task[],
  livedDay: {
    score: 0,
    tag: '',
    doneTasksList: [],
    timestamp: null,
  } as LivedDay,
  initStatus: false as boolean,
};

export type initialStateType = typeof initialState;
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      return { ...state, tasksList: action.payload };
    },
    appendNewTask: (state, action: PayloadAction<Task>) => {
      state.tasksList.push(action.payload);
    },
    editTask: (state, action: PayloadAction<PartialTask>) => {
      const task = state.tasksList.find(
        (task) => task.id === action.payload.id
      );
      if (task) {
        task.data = { ...task.data, ...action.payload.data };
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload
      );
    },
    setInitStatus: (state, action: PayloadAction<boolean>) => {
      state.initStatus = action.payload;
    },
    setLivedDay: (state, action: PayloadAction<LivedDay>) => {
      state.livedDay = { ...state.livedDay, ...action.payload };
    },
    appendTaskToDoneTasksList: (state, action: PayloadAction<LivedTask>) => {
      state.livedDay.doneTasksList.push(action.payload);
    },
    removeTaskToDoneTasksList: (state, action: PayloadAction<string>) => {
      const newdoneTasksList = state.livedDay.doneTasksList.filter(
        (task) => task.id !== action.payload
      );
      state.livedDay.doneTasksList = newdoneTasksList;
    },
    setTag: (state, action: PayloadAction<string>) => {
      state.livedDay.tag = action.payload;
    },
    setScore: (state, action: PayloadAction<Score>) => {
      state.livedDay.score = action.payload;
    },
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.livedDay.timestamp = action.payload;
    },
  },
});

export const {
  setTasks,
  appendNewTask,
  editTask,
  removeTask,
  setInitStatus,
  setLivedDay,
  appendTaskToDoneTasksList,
  removeTaskToDoneTasksList,
  setTag,
  setScore,
  setTimestamp,
} = tasksSlice.actions;

export const getTasks = (): AppThunk => async (dispatch, getState) => {
  try {
    let tasks = await StoreAPI.getTask();
    let time = getState().clock.time;

    let livedDay = await StoreAPI.getLivedDay(format(time, 'dd.MM.yyyy'));

    if (!tasks) throw new Error('Не удалось получить данные');
    if (!livedDay) throw new Error('Не удалось получить данные');

    dispatch(setTasks(tasks));
    dispatch(setLivedDay(livedDay));
    dispatch(setInitStatus(true));
  } catch (err: any) {
    return err.message as string;
  }
};
export const addTask =
  (taskName: string, duration: Duration, repeat = 0): AppThunk =>
  async (dispatch, getState) => {
    const time = getTime(add(getState().clock.time, duration));
    const taskData = { name: taskName, done: false, time, repeat } as TaskData;
    try {
      const newTask = await StoreAPI.setTask(taskData);
      if (!newTask) throw new Error('Не удалось создать задачу');
      dispatch(appendNewTask(newTask));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const updateTask =
  (id: string, data: PartialTaskData): AppThunk =>
  async (dispatch) => {
    try {
      await StoreAPI.updateTask(id, data);
      dispatch(editTask({ id, data }));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const checkTask =
  (task: Task): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { id, data } = task;
      const { name, done, time, repeat } = data;
      let newData;
      // make the data repeat date or complete
      if (repeat) {
        //move task for future
        let newTime = time;
        //count expiration of task + 1 repeat
        let expiration = Math.round(
          (getTime(endOfToday()) - newTime) /
            (milliseconds({ days: 1 }) * repeat) +
            1
        );
        //count date of future task
        newTime = getTime(add(newTime, { days: repeat * expiration }));
        newData = { time: newTime };
      } else {
        newData = { done: !done };
      }
      // add task to done list
      dispatch(checkupTimestamp());
      const doneTasks = {
        id: id,
        name: name,
      };
      //send data as batch
      const taskApiData = { taskId: id, taskData: newData };
      const doneTaskApiData = {
        doneTaskDate: format(getState().clock.time, 'dd.MM.yyyy'),
        doneTask: doneTasks,
        doneTaskRemove: false,
      };
      await StoreAPI.setBatchDoneTask(taskApiData, doneTaskApiData);
      //update store
      dispatch(editTask({ id, data: newData }));
      dispatch(appendTaskToDoneTasksList(doneTasks));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const uncheckTask =
  (task: LivedTask): AppThunk =>
  async (dispatch, getState) => {
    const { id, name } = task;
    try {
      let task = getState().tasks.tasksList.find((task) => task.id === id);
      if (task) {
        const { done, time, repeat } = task.data;
        let newData;
        // make the data repeat date or complete
        if (repeat) {
          //move date to past
          newData = { time: getTime(add(time, { days: -repeat })) };
        } else {
          //return task time and status
          newData = done
            ? { done: !done }
            : { done: false, time: getState().clock.time };
        }
        const taskApiData = { taskId: id, taskData: newData };
        const doneTask = {
          id: id,
          name: name,
        };
        const doneTaskApiData = {
          doneTaskDate: format(getState().clock.time, 'dd.MM.yyyy'),
          doneTask: doneTask,
          doneTaskRemove: true,
        };
        await StoreAPI.setBatchDoneTask(taskApiData, doneTaskApiData);

        //update store

        dispatch(editTask({ id, data: newData }));
        dispatch(removeTaskToDoneTasksList(id));
      } else throw new Error('Нет такой задачи');
    } catch (err: any) {
      return err.message as string;
    }
  };
export const deleteTask =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await StoreAPI.deleteTask(id);
      dispatch(removeTask(id));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const addTag =
  (tag: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(checkupTimestamp());
      const time = format(getState().clock.time, 'dd.MM.yyyy');
      const livedDay = { tag };
      await StoreAPI.updateLivedDay(time, livedDay);
      dispatch(setTag(tag));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const addScore =
  (score: Score): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(checkupTimestamp());
      const date = format(getState().clock.time, 'dd.MM.yyyy');
      const livedDay = { score };
      await StoreAPI.updateLivedDay(date, livedDay);
      dispatch(setScore(score));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const checkupTimestamp = (): AppThunk => async (dispatch, getState) => {
  if (!getState().tasks.livedDay.timestamp) {
    try {
      const date = format(getState().clock.time, 'dd.MM.yyyy');

      const timestamp = getTime(startOfDay(getState().clock.time));
      const livedDay = { timestamp };
      await StoreAPI.updateLivedDay(date, livedDay);
      dispatch(setTimestamp(timestamp));
    } catch (err: any) {
      return err.message as string;
    }
  }
};

export const doAgainTask =
  (task: Task): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { id, data } = task;
      const { done } = data;

      //set date of tomorrow task
      const currentTime = getState().clock.time;
      const newTime = getTime(add(currentTime, { days: 1 }));

      const newData = { time: newTime, done: !done };

      await StoreAPI.updateTask(id, newData);
      //update store
      dispatch(editTask({ id, data: newData }));
    } catch (err: any) {
      return err.message as string;
    }
  };

export default tasksSlice;

export interface Task {
  id: string;
  data: TaskData;
}
export interface TaskData {
  name: string;
  done: boolean;
  time: number;
  repeat: number;
}
export type PartialTaskData = Partial<TaskData>;
export interface PartialTask {
  id: string;
  data: PartialTaskData;
}
export interface LivedTask {
  id: string;
  name: string;
}
export interface LivedDay {
  tag: string;
  score: Score;
  doneTasksList: LivedTask[];
  timestamp: null | number;
}
export type Score = 0 | 1 | 2 | 3 | 4 | 5;
