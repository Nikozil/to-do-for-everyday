import { User } from '@firebase/auth/dist/auth-exp-public';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from '../../api/AuthAPI';
import { UserAPI } from '../../api/UserAPI';
import { AppThunk } from '../store';

let initialState = {
  userData: { uid: '', displayName: null, email: null } as UserData,
  authStatus: false as boolean,
  initStatus: false as boolean,
  loginError: null as LoginErrorType,
};

export type initialStateType = typeof initialState;
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | UserData>) => {
      const { uid, email, displayName } = action.payload;
      return { ...state, userData: { uid, email, displayName } };
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.authStatus = action.payload;
    },
    setInitStatus: (state, action: PayloadAction<boolean>) => {
      state.initStatus = action.payload;
    },
    setError: (state, action: PayloadAction<LoginErrorType>) => {
      state.loginError = action.payload;
    },
  },
});

export const { setUserData, setAuthStatus, setInitStatus, setError } =
  userSlice.actions;

export const signIn =
  (email: string, password: string, remember: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await AuthAPI.signIn(email, password, remember);
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.message as string));
    }
  };
export const signOut = (): AppThunk => async (dispatch) => {
  await AuthAPI.signOut();
  dispatch(setAuthStatus(false));
  dispatch(setUserData(initialState.userData));
};
export const updateUserData = (): AppThunk => async (dispatch) => {
  await AuthAPI.updateUserStatus(
    dispatch,
    setUserData,
    setAuthStatus,
    setInitStatus
  );
};
export const updateProfile =
  (displayName: string): AppThunk =>
  async (dispatch) => {
    await UserAPI.updateProfile(displayName);
    dispatch(updateUserData());
  };

export default userSlice;

export type LoginErrorType = string | null;

export type UserData = Pick<User, 'uid' | 'displayName' | 'email'>;
