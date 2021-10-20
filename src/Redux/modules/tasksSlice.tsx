import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreAPI } from '../../api/StoreAPI';
import { AppThunk } from '../store';

let initialState = {
  tasksList: [] as Task[],
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
      const todo = state.tasksList.find(
        (todo) => todo.id === action.payload.id
      );
      if (todo) {
        todo.data = { ...todo.data, ...action.payload.data };
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasksList = state.tasksList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    setInitStatus: (state, action: PayloadAction<boolean>) => {
      state.initStatus = action.payload;
    },
  },
});

export const { setTasks, editTask, removeTask, setInitStatus } =
  tasksSlice.actions;

export const getTasks = (): AppThunk => async (dispatch) => {
  try {
    let tasks = await StoreAPI.getTask();
    if (!tasks) throw new Error('Не удалось получить данные');
    dispatch(setTasks(tasks));
    dispatch(setInitStatus(true));
  } catch (err: any) {
    return err.message as string;
  }
};
export const addTask =
  (taskName: string): AppThunk =>
  async (dispatch) => {
    const taskData = { name: taskName, done: false } as TaskData;
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

export default tasksSlice;

export interface Task {
  id: string;
  data: TaskData;
}
export interface TaskData {
  name: string;
  done: boolean;
}
export type PartialTaskData = Partial<TaskData>;
interface PartialTask {
  id: string;
  data: PartialTaskData;
}
