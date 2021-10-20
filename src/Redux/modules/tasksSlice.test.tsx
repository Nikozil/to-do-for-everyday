import { StoreAPI } from '../../api/StoreAPI';
import { tasksSliceInitialState as initialState } from '../../utils/tests/test-utils';
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
} from './tasksSlice';
const reducer = tasksSlice.reducer;
const getStateMock = jest.fn();
const dispatchMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

jest.mock('../../api/StoreAPI');
const StoreAPIMock = StoreAPI as jest.Mocked<typeof StoreAPI>;

let result = [{ id: '123', data: { name: 'task0', done: true } }] as Task[];
let testInitialState = {
  tasksList: [{ id: '123', data: { name: 'task0', done: true } }] as Task[],
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
        ...initialState,
        tasksList: [{ id: '123', data: { name: 'task0', done: true } }],
      });
    });
    it('should remove task', () => {
      const id = '123';
      expect(reducer(testInitialState, removeTask(id))).toEqual({
        ...initialState,
        tasksList: [],
      });
    });
    it('should change initStatus', () => {
      expect(reducer(undefined, setInitStatus(true))).toEqual({
        ...initialState,
        initStatus: true,
      });
    });
  });

  describe('thunks', () => {
    describe('getTasks', () => {
      it('getTasks completed', async () => {
        const thunk = getTasks();
        StoreAPIMock.getTask.mockResolvedValue(result);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.getTask).toHaveBeenCalled();
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setTasks(result));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setInitStatus(true));
      });
    });
    describe('addTask', () => {
      it('addTask completed', async () => {
        const thunk = addTask('Задача');
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPIMock.setTask).toHaveBeenCalled();
        expect(StoreAPIMock.setTask).toHaveBeenCalledWith({
          name: 'Задача',
          done: false,
        });

        expect(dispatchMock).toHaveBeenCalled();
      });
    });
    describe('updateTask', () => {
      it('updateTask completed', async () => {
        let id = '123';
        let data = { done: true };
        const thunk = updateTask(id, data);
        await thunk(dispatchMock, getStateMock, {});
        expect(StoreAPI.updateTask).toHaveBeenCalled();
        expect(StoreAPI.updateTask).toHaveBeenCalledWith(id, data);
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(editTask({ id, data }));
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
    });
  });
});
