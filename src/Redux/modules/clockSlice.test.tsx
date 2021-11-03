import { AnyAction } from 'redux';
import clockSlice, {
  initialState,
  setClockInterval,
  startClock,
  stopClock,
  TICK,
} from './clockSlice';
import { getTime } from 'date-fns';

let time = 123;
const reducer = clockSlice.reducer;
const getStateMock = jest.fn();
const dispatchMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});
// jest.mock('date-fns', () => {
//   const originalModule = jest.requireActual('date-fns');
//   const getTime = jest.fn().mockResolvedValue(123);

//   return { ...originalModule, getTime };
// });

jest.mock('date-fns');

const getTimeMock = getTime as jest.Mock;

describe('clockSlice', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
  });

  describe('actions', () => {
    it('should set TICK', () => {
      getTimeMock.mockReturnValue(time);

      expect(reducer(undefined, TICK())).toEqual({
        ...initialState,
        time: time,
      });
    });
    it('should set interval', () => {
      expect(reducer(undefined, setClockInterval(5))).toEqual({
        ...initialState,
        interval: 5,
      });
    });
  });

  describe('thunks', () => {
    describe('startClock', () => {
      it('startClock completed', async () => {
        const thunk = startClock();
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(2);
      });
    });
    describe('stopClock', () => {
      it('stopClock completed', async () => {
        getStateMock.mockReturnValue({ clock: { interval: 1 } });
        const thunk = stopClock();

        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
      });
    });
  });
});
