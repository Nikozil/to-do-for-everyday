import { AuthAPI } from '../../api/AuthAPI';
import { AppThunk, InferActionsTypes } from '../store';
import { User } from '@firebase/auth/dist/auth-exp-public';
import { UserAPI } from '../../api/UserAPI';

let initialState = {
  userData: {
    displayName: null,
    email: null,
  } as User,
  authStatus: false as boolean,
  initStatus: false as boolean,
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
        userData: { ...action.payload },
      };
    case 'to-do-for-everyday/user/SET_AUTH_STATUS':
      return {
        ...state,
        authStatus: action.payload,
      };
    case 'to-do-for-everyday/user/SET_INIT_STATUS':
      return {
        ...state,
        initStatus: action.payload,
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
  setUserData: (userData: User) =>
    ({
      type: 'to-do-for-everyday/user/SET_USER_DATA',
      payload: userData,
    } as const),
  setAuthStatus: (authStatus: boolean) =>
    ({
      type: 'to-do-for-everyday/user/SET_AUTH_STATUS',
      payload: authStatus,
    } as const),
  setInitStatus: (initStatus: boolean) =>
    ({
      type: 'to-do-for-everyday/user/SET_INIT_STATUS',
      payload: initStatus,
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
  dispatch(actions.setAuthStatus(false));
  dispatch(actions.setUserData(initialState.userData));
};
export const updateUserData = (): AppThunk => async (dispatch) => {
  await AuthAPI.updateUserStatus(
    dispatch,
    actions.setUserData,
    actions.setAuthStatus,
    actions.setInitStatus
  );
};
export const updateProfile =
  (displayName: string): AppThunk =>
  async (dispatch) => {
    await UserAPI.updateProfile(displayName);
    dispatch(updateUserData());
  };

export type LoginErrorType = string | null;

export default userReducer;
