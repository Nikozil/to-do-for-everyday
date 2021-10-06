import userSlice, {
  setAuthStatus,
  setError,
  setInitStatus,
  setUserData,
  signIn,
  signOut,
  updateUserData,
} from './userReducer';
import { AuthAPI } from '../../api/AuthAPI';
import { User } from '@firebase/auth/dist/auth-exp-public';
import { userReducerInitialState as initialState } from '../../utils/tests/test-utils';
import { AnyAction } from 'redux';
const reducer = userSlice.reducer;
const getStateMock = jest.fn();
const dispatchMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

jest.mock('../../api/AuthAPI');
const AuthAPIMock = AuthAPI as jest.Mocked<typeof AuthAPI>;

let result = {} as User;

describe('userSlice', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {} as AnyAction)).toEqual(initialState);
    });
  });

  describe('actions', () => {
    it('should add new user data', () => {
      const userData = { uid: '12345', email: 'mail@mail.ru' } as User;
      expect(reducer(undefined, setUserData(userData))).toEqual({
        ...initialState,
        userData: { uid: '12345', email: 'mail@mail.ru' },
      });
    });
    it('should add new loginError', () => {
      const error = 'Wrong password';
      expect(reducer(undefined, setError(error))).toEqual({
        ...initialState,
        loginError: 'Wrong password',
      });
    });
    it('should change authStatus', () => {
      expect(reducer(undefined, setAuthStatus(true))).toEqual({
        ...initialState,
        authStatus: true,
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
    describe('signIn', () => {
      it('signIn completed', async () => {
        const thunk = signIn('123', '123', true);
        AuthAPIMock.signIn.mockResolvedValue(result);
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(setError(null));
      });
      it('signIn fail', async () => {
        const thunk = signIn('123', '123', true);
        AuthAPIMock.signIn.mockRejectedValue(
          new Error('Неверный логин или пароль')
        );
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(
          setError('Неверный логин или пароль')
        );
      });
    });
    describe('signOut', () => {
      it('signOut completed', async () => {
        const thunk = signOut();
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toHaveBeenCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setAuthStatus(false));
        expect(dispatchMock).toHaveBeenNthCalledWith(
          2,
          setUserData(initialState.userData)
        );
      });
    });
    describe('updateUserData', () => {
      it('updateUserData completed', async () => {
        const thunk = updateUserData();
        await thunk(dispatchMock, getStateMock, {});
        expect(AuthAPIMock.updateUserStatus).toHaveBeenCalled();
        expect(AuthAPIMock.updateUserStatus).toHaveBeenCalledWith(
          dispatchMock,
          setUserData,
          setAuthStatus,
          setInitStatus
        );
      });
    });
  });
});
