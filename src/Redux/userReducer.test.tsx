import userReducer, {
  actions,
  ActionsTypes,
  singIn,
  updateUserData,
} from './userReducer';
import { AuthAPI } from '../api/AuthAPI';
import { User } from '@firebase/auth/dist/auth-exp-public';

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
      const user = { name: 'John', email: 'John@mail.com' };
      expect(userReducer(undefined, actions.setUserData(user))).toEqual({
        user: { name: 'John', email: 'John@mail.com' },
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
});
