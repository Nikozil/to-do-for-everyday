import { AuthAPI } from '../../api/AuthAPI';
import { AppThunk, InferActionsTypes } from '../store';
import { User } from '@firebase/auth/dist/auth-exp-public';

let initialState = {
  user: null as UserState,
  loginError: null as LoginErrorType,
};

export type initialStateType = typeof initialState;
const userReducer = (
  state: initialStateType = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'to-do-for-everyday/user/SET_USER_DATA':
      return {
        ...state,
        user: action.payload,
      };
    case 'to-do-for-everyday/user/SET_ERROR':
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
};
export type ActionsTypes = InferActionsTypes<typeof actions>;
export const actions = {
  setUserData: (user: UserState) =>
    ({
      type: 'to-do-for-everyday/user/SET_USER_DATA',
      payload: user,
    } as const),
  setError: (error: LoginErrorType) =>
    ({
      type: 'to-do-for-everyday/user/SET_ERROR',
      payload: error,
    } as const),
};

export const signIn =
  (email: string, password: string, remember: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await AuthAPI.signIn(email, password, remember);
      dispatch(actions.setError(null));
    } catch (err: any) {
      dispatch(actions.setError(err.message as string));
    }
  };
export const signOut = (): AppThunk => async (dispatch) => {
  await AuthAPI.signOut();
  dispatch(actions.setUserData(false));
};
export const updateUserData = (): AppThunk => async (dispatch) => {
  await AuthAPI.updateUserStatus(dispatch, actions.setUserData);
};

export type UserState = User | null | false;
export type LoginErrorType = string | null;

export default userReducer;
