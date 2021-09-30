import userReducer, {
  actions,
  ActionsTypes,
  signIn,
  signOut,
  updateUserData,
} from './userReducer';
import { AuthAPI } from '../../api/AuthAPI';
import { User } from '@firebase/auth/dist/auth-exp-public';

const getStateMock = jest.fn();
const dispatchMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

jest.mock('../../api/AuthAPI');
const AuthAPIMock = AuthAPI as jest.Mocked<typeof AuthAPI>;

let result = {} as User;

describe('userReducer', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined, {} as ActionsTypes)).toEqual({
        user: null,
        loginError: null,
      });
    });
  });

  describe('actions', () => {
    it('should add new user data', () => {
      const user = { uid: '12345', email: 'mail@mail.ru' } as User;
      expect(userReducer(undefined, actions.setUserData(user))).toEqual({
        user: { uid: '12345', email: 'mail@mail.ru' },
        loginError: null,
      });
    });
    it('should add new loginError', () => {
      const error = 'Wrong password';
      expect(userReducer(undefined, actions.setError(error))).toEqual({
        user: null,
        loginError: 'Wrong password',
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
        expect(dispatchMock).toHaveBeenCalledWith(actions.setError(null));
      });
      it('signIn fail', async () => {
        const thunk = signIn('123', '123', true);
        AuthAPIMock.signIn.mockRejectedValue(
          new Error('Неверный логин или пароль')
        );
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(
          actions.setError('Неверный логин или пароль')
        );
      });
    });
    describe('signOut', () => {
      it('signOut completed', async () => {
        const thunk = signOut();
        await thunk(dispatchMock, getStateMock, {});
        expect(dispatchMock).toHaveBeenCalled();
        expect(dispatchMock).toHaveBeenCalledWith(actions.setUserData(false));
      });
    });
    describe('updateUserData', () => {
      it('updateUserData completed', async () => {
        const thunk = updateUserData();
        await thunk(dispatchMock, getStateMock, {});
        expect(AuthAPIMock.updateUserStatus).toHaveBeenCalled();
        expect(AuthAPIMock.updateUserStatus).toHaveBeenCalledWith(
          dispatchMock,
          actions.setUserData
        );
      });
    });
  });
});
