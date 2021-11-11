import { format } from 'date-fns';
import { AnyAction } from 'redux';
import { StoreAPI } from '../../api/StoreAPI';
import tasksSlice, {
  addTask,
  addTaskToDoneTasksList,
  checkTask,
  deleteTask,
  LivedDay,
  editTask,
  getTasks,
  initialState,
  removeTask,
  removeTaskToDoneTasksList,
  setLivedDay,
  setInitStatus,
  setScore,
  setTag,
  setTasks,
  Task,
  uncheckTask,
  updateTask,
  setTimestamp,
  addTag,
  addScore,
  checkupTimestamp,
  doAgainTask,
  PartialTask,
} from './tasksSlice';
const reducer = tasksSlice.reducer;
const getStateMock = jest.fn();
const dispatchMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  // getStateMock.mockClear();
  getStateMock.mockReturnValue({ clock: { time: new Date().getTime() } });
});

jest.mock('../../api/StoreAPI');
const StoreAPIMock = StoreAPI as jest.Mocked<typeof StoreAPI>;

let getTaskResult = [
  { id: '123', data: { name: 'task0', done: true } },
] as Task[];
let getLivedDay = {
  score: 3,
  tag: 'Печальный День',
  doneTasksList: [{ id: '1234', name: 'Task' }],
} as LivedDay;
let testInitialState = {
  tasksList: [{ id: '123', data: { name: 'task0', done: true } }] as Task[],
  livedDay: {
    score: 3,
    tag: 'Печальный День',
    doneTasksList: [{ id: '1234', name: 'Task' }],
    timestamp: 1636630400590,
  } as LivedDay,
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
      let livedDay = {
        score: 3,
        tag: 'Бе',
        doneTasksList: [{ id: '1234', name: 'Task' }],
        timestamp: 1636630400590,
      } as LivedDay;
      expect(reducer(undefined, setLivedDay(livedDay))).toEqual({
        ...initialState,
        livedDay: livedDay,
      });
    });
    it('should add TaskToDoneTasksList', () => {
      expect(
        reducer(
          testInitialState,
          addTaskToDoneTasksList({ id: '12345', name: 'Task2' })
        )
      ).toEqual({
        ...testInitialState,
        livedDay: {
          score: 3,
          tag: 'Печальный День',
          doneTasksList: [
            { id: '1234', name: 'Task' },
            { id: '12345', name: 'Task2' },
          ],
          timestamp: 1636630400590,
        },
      });
    });
    it('should remove TaskToDoneTasksList', () => {
      expect(
        reducer(testInitialState, removeTaskToDoneTasksList('1234'))
      ).toEqual({
        ...testInitialState,
        livedDay: {
          score: 3,
          tag: 'Печальный День',
          doneTasksList: [],
          timestamp: 1636630400590,
        },
      });
    });
    it('should set Tag', () => {
      expect(reducer(testInitialState, setTag('Чудесный День'))).toEqual({
        ...testInitialState,
        livedDay: {
          score: 3,
          tag: 'Чудесный День',
          doneTasksList: [{ id: '1234', name: 'Task' }],
          timestamp: 1636630400590,
        },
      });
    });
    it('should set Score', () => {
      expect(reducer(testInitialState, setScore(2))).toEqual({
        ...testInitialState,
        livedDay: {
          score: 2,
          tag: 'Печальный День',
          doneTasksList: [{ id: '1234', name: 'Task' }],
          timestamp: 1636630400590,
        },
      });
    });
    it('should set Timestamp', () => {
      expect(reducer(testInitialState, setTimestamp(1636630400595))).toEqual({
        ...testInitialState,
        livedDay: {
          score: 3,
          tag: 'Печальный День',
          doneTasksList: [{ id: '1234', name: 'Task' }],
          timestamp: 1636630400595,
        },
      });
    });
  });

  describe('thunks', () => {
    describe('getTasks', () => {
      it('getTasks completed', async () => {
        const thunk = getTasks();
        StoreAPIMock.getTask.mockResolvedValue(getTaskResult);
        StoreAPIMock.getLivedDay.mockResolvedValue(getLivedDay);
        await thunk(dispatchMock, getStateMock, {});

        expect(StoreAPIMock.getTask).toHaveBeenCalled();
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(
          1,
          setTasks(getTaskResult)
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          setLivedDay(getLivedDay)
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setInitStatus(true));
      });
    });
    describe('addTask', () => {
      it('addTask completed', async () => {
        getStateMock.mockReturnValue({ clock: { time: 1635606187350 } });

        const thunk = addTask('Задача', {});
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
        const thunk = addTask('Задача', {});
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
          doneTask: { id: '123', name: 'task0' },
          doneTaskRemove: false,
        };
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalledWith(
          taskApiData,
          doneTaskApiData
        );
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, expect.any(Function));
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          editTask({ id: '123', data: { done: true } })
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          3,
          addTaskToDoneTasksList({ id: '123', name: 'task0' })
        );
      });
      it('checkTask completed with repeat', async () => {
        let date = new Date().getTime();
        let task = {
          id: '123',
          data: { name: 'task0', done: false, time: date, repeat: 1 },
        };
        const thunk = checkTask(task);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = {
          taskId: '123',
          taskData: { time: date + 86400000 },
        };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTask: { id: '123', name: 'task0' },
          doneTaskRemove: false,
        };
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalledWith(
          taskApiData,
          doneTaskApiData
        );
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, expect.any(Function));
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          editTask({ id: '123', data: { time: date + 86400000 } })
        );
        expect(dispatchMock).toHaveBeenNthCalledWith(
          3,
          addTaskToDoneTasksList({ id: '123', name: 'task0' })
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

        getStateMock.mockReturnValue({
          tasks: { tasksList: [task] },
          clock: { time: new Date().getTime() },
        });
        const thunk = uncheckTask({ id: '123', name: 'Task' });
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = { taskId: '123', taskData: { done: false } };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTask: { id: '123', name: 'Task' },
          doneTaskRemove: true,
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

        getStateMock.mockReturnValue({
          tasks: { tasksList: [task] },
          clock: { time: new Date().getTime() },
        });
        const thunk = uncheckTask({ id: '123', name: 'Task' });
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setBatchDoneTask).toHaveBeenCalled();
        const taskApiData = {
          taskId: '123',
          taskData: { time: 1635611630166 },
        };
        const doneTaskApiData = {
          doneTaskDate: format(new Date(), 'dd.MM.yyyy'),
          doneTask: { id: '123', name: 'Task' },
          doneTaskRemove: true,
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
        const thunk = uncheckTask({ id: '123', name: 'Task' });
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Нет такой задачи');
      });
    });
    describe('addTag', () => {
      it('addTag completed', async () => {
        const thunk = addTag('Тэг');
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.updateLivedDay).toHaveBeenCalled();

        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, expect.any(Function));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setTag('Тэг'));
      });
      it('addTag uncompleted', async () => {
        const thunk = addTag('Тэг');
        StoreAPIMock.updateLivedDay.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('addScore', () => {
      it('addScore completed', async () => {
        const thunk = addScore(2);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.updateLivedDay).toHaveBeenCalled();

        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, expect.any(Function));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setScore(2));
      });
      it('addScore uncompleted', async () => {
        const thunk = addScore(2);
        StoreAPIMock.updateLivedDay.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('checkupTimestamp', () => {
      it('checkupTimestamp not be called', async () => {
        getStateMock.mockReturnValue({
          tasks: { livedDay: { timestamp: 1635606187350 } },
        });

        const thunk = checkupTimestamp();
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.updateLivedDay).not.toHaveBeenCalled();

        expect(dispatchMock).not.toBeCalled();
      });
      it('checkupTimestamp completed', async () => {
        getStateMock.mockReturnValue({
          clock: { time: 1635606187350 },
          tasks: { livedDay: { timestamp: null } },
        });

        const thunk = checkupTimestamp();
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.updateLivedDay).toHaveBeenCalled();

        expect(dispatchMock).toBeCalled();
        expect(dispatchMock).toHaveBeenCalledWith(setTimestamp(1635541200000));
      });
      it('checkupTimestamp uncompleted', async () => {
        getStateMock.mockReturnValue({
          clock: { time: 1635606187350 },
          tasks: { livedDay: { timestamp: null } },
        });
        const thunk = checkupTimestamp();
        StoreAPIMock.updateLivedDay.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
    describe('doAgainTask', () => {
      it('doAgainTask completed', async () => {
        const testTask = {
          id: '123',
          data: { name: 'task0', done: true },
        } as Task;
        getStateMock.mockReturnValue({
          clock: { time: 1635606187350 },
        });

        const thunk = doAgainTask(testTask);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.updateTask).toHaveBeenCalled();

        const newData = {
          id: '123',
          data: { done: false, time: 1635692587350 },
        } as PartialTask;
        expect(dispatchMock).toBeCalled();
        expect(dispatchMock).toHaveBeenCalledWith(editTask(newData));
      });
      it('checkupTimestamp uncompleted', async () => {
        const testTask = {
          id: '123',
          data: { name: 'task0', done: true },
        } as Task;
        getStateMock.mockReturnValue({
          clock: { time: 1635606187350 },
        });
        const thunk = doAgainTask(testTask);

        StoreAPIMock.updateTask.mockRejectedValue(new Error('Ошибка'));
        const result = await thunk(dispatchMock, getStateMock, {});
        expect(result).toBe('Ошибка');
      });
    });
  });
});
