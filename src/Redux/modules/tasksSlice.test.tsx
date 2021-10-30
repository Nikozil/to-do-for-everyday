import { StoreAPI } from '../../api/StoreAPI';
import { AnyAction } from 'redux';
import tasksSlice, {
  getTasks,
  setTasks,
  editTask,
  Task,
  removeTask,
  setInitStatus,
  addTask,
  updateTask,
  deleteTask,
  initialState,
  DoneTask,
  setDoneTasks,
  addTaskToDoneTasksList,
  removeTaskToDoneTasksList,
  checkTask,
  uncheckTask,
} from './tasksSlice';
import { format } from 'date-fns';
const reducer = tasksSlice.reducer;
const getStateMock = jest.fn();
const dispatchMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

jest.mock('../../api/StoreAPI');
const StoreAPIMock = StoreAPI as jest.Mocked<typeof StoreAPI>;

let getTaskResult = [
  { id: '123', data: { name: 'task0', done: true } },
] as Task[];
let getDoneTaskResult = { '12312321': 'Task' } as DoneTask;
let testInitialState = {
  tasksList: [{ id: '123', data: { name: 'task0', done: true } }] as Task[],
  doneTasksList: { '1234': 'Task' } as DoneTask,
  initStatus: false as boolean,
};

describe('tasksSlice', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
  });

  describe('actions', () => {
    it('should set tasks', () => {
      const tasksList = [
        { id: '12345', data: { name: 'task', done: false } },
        { id: '54321', data: { name: 'task2', done: true } },
      ] as Task[];
      expect(reducer(undefined, setTasks(tasksList))).toEqual({
        ...initialState,
        tasksList: tasksList,
      });
    });
    it('should edit task', () => {
      const editedTask = { id: '123', data: { done: true } };
      expect(reducer(testInitialState, editTask(editedTask))).toEqual({
        ...testInitialState,
        tasksList: [{ id: '123', data: { name: 'task0', done: true } }],
      });
    });
    it('should remove task', () => {
      const id = '123';
      expect(reducer(testInitialState, removeTask(id))).toEqual({
        ...testInitialState,
        tasksList: [],
      });
    });
    it('should change initStatus', () => {
      expect(reducer(undefined, setInitStatus(true))).toEqual({
        ...initialState,
        initStatus: true,
      });
    });
    it('should set DoneTasks', () => {
      expect(reducer(undefined, setDoneTasks({ '123': 'Task' }))).toEqual({
        ...initialState,
        doneTasksList: { '123': 'Task' },
      });
    });
    it('should add TaskToDoneTasksList', () => {
      expect(
        reducer(testInitialState, addTaskToDoneTasksList({ '12345': 'Task2' }))
      ).toEqual({
        ...testInitialState,
        doneTasksList: { '1234': 'Task', '12345': 'Task2' },
      });
    });
    it('should remove TaskToDoneTasksList', () => {
      expect(
        reducer(testInitialState, removeTaskToDoneTasksList('1234'))
      ).toEqual({
        ...testInitialState,
        doneTasksList: {},
      });
    });
  });

  describe('thunks', () => {
    describe('getTasks', () => {
      it('getTasks completed', async () => {
        const thunk = getTasks();
        StoreAPIMock.getTask.mockResolvedValue(getTaskResult);
        StoreAPIMock.getDoneTask.mockResolvedValue(getDoneTaskResult);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.getTask).toHaveBeenCalled();
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(
          1,
          setTasks(getTaskResult)
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          setDoneTasks(getDoneTaskResult)
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setInitStatus(true));
      });
    });
    describe('addTask', () => {
      it('addTask completed', async () => {
        const thunk = addTask('Задача', 1635606187350);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setTask).toHaveBeenCalled();
        expect(StoreAPIMock.setTask).toHaveBeenCalledWith({
          name: 'Задача',
          done: false,
          time: 1635606187350,
          repeat: 0,
        });

        expect(dispatchMock).toHaveBeenCalled();
      });
      it('addTask uncompleted', async () => {
        const thunk = addTask('Задача', 1635606187350);
        StoreAPIMock.setTask.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('updateTask', () => {
      it('updateTask completed', async () => {
        let id = '123';
        let data = { done: true };
        const thunk = updateTask(id, data);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.updateTask).toHaveBeenCalled();
        expect(StoreAPIMock.updateTask).toHaveBeenCalledWith(id, data);
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(editTask({ id, data }));
      });
      it('updateTask uncompleted', async () => {
        const thunk = updateTask('123', { done: true });

        StoreAPIMock.updateTask.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('deleteTask', () => {
      it('deleteTask completed', async () => {
        let id = '123';
        const thunk = deleteTask(id);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPI.deleteTask).toHaveBeenCalled();
        expect(StoreAPI.deleteTask).toHaveBeenCalledWith(id);
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(removeTask(id));
      });
      it('deleteTask uncompleted', async () => {
        const thunk = deleteTask('123');
        StoreAPIMock.deleteTask.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('checkTask', () => {
      it('checkTask completed', async () => {
        let task = {
          id: '123',
          data: { name: 'task0', done: false, time: 1635611630166, repeat: 0 },
        };
        const thunk = checkTask(task);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = { taskId: '123', taskData: { done: true } };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTasks: { '123': 'task0' },
          doneTasksMerge: true,
        };
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalledWith(
          taskApiData,
          doneTaskApiData
        );
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(
          1,
          editTask({ id: '123', data: { done: true } })
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          addTaskToDoneTasksList({ '123': 'task0' })
        );
      });
      it('checkTask completed with repeat', async () => {
        let task = {
          id: '123',
          data: { name: 'task0', done: false, time: 1635611630166, repeat: 1 },
        };
        const thunk = checkTask(task);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = {
          taskId: '123',
          taskData: { time: 1635698030166 },
        };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTasks: { '123': 'task0' },
          doneTasksMerge: true,
        };
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalledWith(
          taskApiData,
          doneTaskApiData
        );
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(
          1,
          editTask({ id: '123', data: { time: 1635698030166 } })
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          addTaskToDoneTasksList({ '123': 'task0' })
        );
      });
      it('updateTask uncompleted', async () => {
        let task = {
          id: '123',
          data: { name: 'task0', done: false, time: 1635611630166, repeat: 1 },
        };
        const thunk = checkTask(task);

        StoreAPIMock.setBatchDoneTask.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('uncheckTask', () => {
      it('uncheckTask completed', async () => {
        let task = {
          id: '123',
          data: { name: 'task0', done: true, time: 1635611630166, repeat: 0 },
        };

        getStateMock.mockReturnValue({ tasks: { tasksList: [task] } });
        const thunk = uncheckTask('123');
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = { taskId: '123', taskData: { done: false } };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTasks: {},
          doneTasksMerge: false,
        };
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalledWith(
          taskApiData,
          doneTaskApiData
        );
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(
          1,
          editTask({ id: '123', data: { done: false } })
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          removeTaskToDoneTasksList('123')
        );
      });
      it('uncheckTask completed with repeat', async () => {
        let task = {
          id: '123',
          data: { name: 'task0', done: true, time: 1635698030166, repeat: 1 },
        };

        getStateMock.mockReturnValue({ tasks: { tasksList: [task] } });
        const thunk = uncheckTask('123');
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = {
          taskId: '123',
          taskData: { time: 1635611630166 },
        };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTasks: {},
          doneTasksMerge: false,
        };
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalledWith(
          taskApiData,
          doneTaskApiData
        );
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(
          1,
          editTask({ id: '123', data: { time: 1635611630166 } })
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          removeTaskToDoneTasksList('123')
        );
      });
      it('uncheckTask uncompleted', async () => {
        getStateMock.mockReturnValue({ tasks: { tasksList: [] } });
        const thunk = uncheckTask('123');
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Нет такой задачи');
      });
    });
  });
});
