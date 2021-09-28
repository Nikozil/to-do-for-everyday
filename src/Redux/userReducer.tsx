import { AuthAPI } from '../api/AuthAPI';
import { AppThunk, InferActionsTypes } from './store';
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

export const singIn =
  (email: string, password: string, remember: boolean): AppThunk =>
  async (dispatch) => {
    try {
      let user = await AuthAPI.signIn(email, password, remember);
      dispatch(actions.setError(null));
    } catch (err: any) {
      dispatch(actions.setError(err.message as string));
    }
  };
export const singOut = (): AppThunk => async (dispatch) => {
  let user = await AuthAPI.signOut();
  dispatch(actions.setUserData(false));
};
export const updateUserData = (): AppThunk => async (dispatch) => {
  AuthAPI.updateUserStatus(dispatch)(actions.setUserData);
};

interface UserType {}
export type UserState = UserType | null;
type LoginErrorType = string | null;

export default userReducer;
