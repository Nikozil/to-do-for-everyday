import { User } from '@firebase/auth/dist/auth-exp-public';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from '../../api/AuthAPI';
import { UserAPI } from '../../api/UserAPI';
import { AppThunk } from '../store';

let initialState = {
  userData: { uid: '', displayName: null, email: null } as UserData,
  authStatus: false as boolean,
  initStatus: false as boolean,
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
  },
});

export const { setUserData, setAuthStatus, setInitStatus } = userSlice.actions;

export const signIn =
  (email: string, password: string, remember: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await AuthAPI.signIn(email, password, remember);
      return 'Авторизация выполнена';
    } catch (err: any) {
      return err.message as string;
    }
  };
export const signOut = (): AppThunk => async (dispatch) => {
  try {
    await AuthAPI.signOut();
    dispatch(setAuthStatus(false));
    dispatch(setUserData(initialState.userData));
  } catch (err: any) {
    return err.message as string;
  }
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
  (displayName: string): AppThunk<Promise<string>> =>
  async (dispatch) => {
    try {
      await UserAPI.updateProfile(displayName);
    } catch (err: any) {
      return err.message;
    }
    dispatch(updateUserData());
  };
export const updatePassword =
  (oldPassword: string, newPassword: string): AppThunk<Promise<string>> =>
  async (dispatch) => {
    try {
      let responce = await AuthAPI.updatePassword(oldPassword, newPassword);
      return responce;
    } catch (err: any) {
      return err.message as string;
    }
  };

export default userSlice;

export type UserData = Pick<User, 'uid' | 'displayName' | 'email'>;
