import { AnyAction } from 'redux';
import { StoreAPI } from '../../api/StoreAPI';
import historySlice, {
  getDays,
  HistoryDay,
  initialState,
  setDays,
  setInitStatus,
} from './historySlice';
const reducer = historySlice.reducer;
const getStateMock = jest.fn();
const dispatchMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  // getStateMock.mockClear();
  getStateMock.mockReturnValue({ clock: { time: new Date().getTime() } });
});

jest.mock('../../api/StoreAPI');
const StoreAPIMock = StoreAPI as jest.Mocked<typeof StoreAPI>;

const testDaysList = [
  {
    score: 3,
    tag: 'Печальный День',
    doneTasksList: [{ id: '1234', name: 'Task' }],
    timestamp: 1636630400590,
  },
] as HistoryDay[];

describe('historySlice', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
  });

  describe('actions', () => {
    it('should set days', () => {
      const daysList = [
        {
          score: 3,
          tag: 'Печальный День',
          doneTasksList: [{ id: '1234', name: 'Task' }],
          timestamp: 1636630400590,
        },
      ] as HistoryDay[];
      expect(reducer(undefined, setDays(daysList))).toEqual({
        ...initialState,
        daysList: daysList,
      });
    });

    it('should change initStatus', () => {
      expect(reducer(undefined, setInitStatus(true))).toEqual({
        ...initialState,
        initStatus: true,
      });
    });
  });
});

describe('thunks', () => {
  describe('getDays', () => {
    it('getDays completed', async () => {
      const thunk = getDays(10, 2020);
      StoreAPIMock.getDays.mockResolvedValue(testDaysList);
      await thunk(dispatchMock, getStateMock, {});

      expect(StoreAPIMock.getDays).toHaveBeenCalled();
      expect(dispatchMock).toBeCalledTimes(3);
      expect(dispatchMock).toHaveBeenNthCalledWith(1, setInitStatus(false));
      expect(dispatchMock).toHaveBeenNthCalledWith(2, setDays(testDaysList));
      expect(dispatchMock).toHaveBeenNthCalledWith(3, setInitStatus(true));
    });
  });
});
