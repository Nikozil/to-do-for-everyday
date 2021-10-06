import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updatePassword,
  User,
} from '@firebase/auth';
import React, { Dispatch } from 'react';
import { getFirebase, getReCaptcha } from '../firebase';

export const firebaseApp = getFirebase();
if (!firebaseApp) throw new Error('Firebase not initialized');

export const auth = getAuth();
export const appCheck = getReCaptcha(firebaseApp);

export const AuthAPI = {
  signUp: async (email: string, password: string, remember: boolean) => {
    if (firebaseApp) {
      try {
        await setPersistence(
          auth,
          remember ? browserLocalPersistence : browserSessionPersistence
        );

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const responseUser = userCredential.user;
        return responseUser;
      } catch (error) {
        throw new Error('Такой пользователь уже существует');
      }
    }
  },

  signIn: async (email: string, password: string, remember: boolean) => {
    if (firebaseApp) {
      try {
        await setPersistence(
          auth,
          remember ? browserLocalPersistence : browserSessionPersistence
        );

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const responseUser = userCredential.user;
        return responseUser;
      } catch (error) {
        throw new Error('Неверный логин или пароль');
      }
    }
  },

  signOut: async () => {
    if (firebaseApp) {
      try {
        const responce = await signOut(auth);
        return responce;
      } catch (error) {
        console.log('error', error);
      }
    }
  },
  updatePassword:
    (newPassword: string) =>
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (firebaseApp) {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            await updatePassword(currentUser, newPassword);
          } else throw new Error('Пользователь не авторизован');
        } catch (error) {
          console.log('error', error);
        }
      }
    },
  updateUserStatus: (
    dispatch: Dispatch<any>,
    setUserCallback: (user: User) => void,
    setAuthCallback: (authStatus: boolean) => void,
    setInitCallback: (initStatus: boolean) => void
  ) => {
    if (firebaseApp) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setInitCallback(true));
          dispatch(setAuthCallback(true));
          dispatch(setUserCallback(user));
        } else {
          dispatch(setInitCallback(true));
          dispatch(setAuthCallback(false));
        }
      });
    }
  },
};
