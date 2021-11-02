import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { add, endOfToday, format, getTime, milliseconds } from 'date-fns';
import { StoreAPI } from '../../api/StoreAPI';
import { AppThunk } from '../store';

export const initialState = {
  tasksList: [] as Task[],
  doneDay: { score: 0, tag: '', doneTasksList: [] } as DoneDay,
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
    setDoneDay: (state, action: PayloadAction<DoneDay>) => {
      state.doneDay = { ...state.doneDay, ...action.payload };
    },
    addTaskToDoneTasksList: (state, action: PayloadAction<DoneTask>) => {
      state.doneDay.doneTasksList.push(action.payload);
    },
    removeTaskToDoneTasksList: (state, action: PayloadAction<string>) => {
      const newdoneTasksList = state.doneDay.doneTasksList.filter(
        (task) => task.id !== action.payload
      );
      state.doneDay.doneTasksList = newdoneTasksList;
    },
    setTag: (state, action: PayloadAction<string>) => {
      state.doneDay.tag = action.payload;
    },
    setScore: (state, action: PayloadAction<Score>) => {
      state.doneDay.score = action.payload;
    },
  },
});

export const {
  setTasks,
  editTask,
  removeTask,
  setInitStatus,
  setDoneDay,
  addTaskToDoneTasksList,
  removeTaskToDoneTasksList,
  setTag,
  setScore,
} = tasksSlice.actions;

export const getTasks = (): AppThunk => async (dispatch) => {
  try {
    let tasks = await StoreAPI.getTask();
    let doneDay = await StoreAPI.getDoneDay(format(new Date(), 'dd.MM.yyyy'));

    if (!tasks) throw new Error('Не удалось получить данные');
    if (!doneDay) throw new Error('Не удалось получить данные');

    dispatch(setTasks(tasks));
    dispatch(setDoneDay(doneDay));
    dispatch(setInitStatus(true));
  } catch (err: any) {
    return err.message as string;
  }
};
export const addTask =
  (taskName: string, time: number, repeat = 0): AppThunk =>
  async (dispatch) => {
    const taskData = { name: taskName, done: false, time, repeat } as TaskData;
    try {
      await StoreAPI.setTask(taskData);
      dispatch(getTasks());
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
      const doneTasks = {
        id: id,
        name: name,
      };
      //send data as batch
      const taskApiData = { taskId: id, taskData: newData };
      const doneTaskApiData = {
        doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
        doneTask: doneTasks,
        doneTaskRemove: false,
      };
      await StoreAPI.setBatchDoneTask(taskApiData, doneTaskApiData);
      //update store
      dispatch(editTask({ id, data: newData }));
      dispatch(addTaskToDoneTasksList(doneTasks));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const uncheckTask =
  (task: DoneTask): AppThunk =>
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
          newData = { done: !done };
        }
        const taskApiData = { taskId: id, taskData: newData };
        const doneTask = {
          id: id,
          name: name,
        };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
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
  async (dispatch) => {
    try {
      const date = format(new Date(), 'dd.MM.yyyy');
      const doneDay = { tag };
      await StoreAPI.updateDoneDay(date, doneDay);
      dispatch(setTag(tag));
    } catch (err: any) {
      return err.message as string;
    }
  };
export const addScore =
  (score: Score): AppThunk =>
  async (dispatch) => {
    try {
      const date = format(new Date(), 'dd.MM.yyyy');
      const doneDay = { score };
      await StoreAPI.updateDoneDay(date, doneDay);
      dispatch(setScore(score));
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
interface PartialTask {
  id: string;
  data: PartialTaskData;
}
export interface DoneTask {
  id: string;
  name: string;
}
export interface DoneDay {
  tag: string;
  score: Score;
  doneTasksList: DoneTask[];
}
export type Score = 0 | 1 | 2 | 3 | 4 | 5;
