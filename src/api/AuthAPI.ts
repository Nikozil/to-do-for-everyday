import { auth, firebaseApp } from '../firebase';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
} from '@firebase/auth';
import { Dispatch } from 'react';

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
      } catch (error: any) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).')
          throw new Error('Такой пользователь уже существует');
        else throw new Error(error.message);
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
      } catch (error: any) {
        if (
          error.message === 'Firebase: Error (auth/user-not-found).' ||
          error.message === 'Firebase: Error (auth/wrong-password).'
        )
          throw new Error('Неверный логин или пароль');
        else throw new Error(error.message);
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
        throw new Error('Что-то пошло не так');
      }
    }
  },

  updatePassword: async (oldPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    if (firebaseApp && user && user.email) {
      try {
        const credential1 = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );
        await reauthenticateWithCredential(user, credential1);
        await updatePassword(user, newPassword);
        return 'Пароль изменен';
      } catch (error) {
        console.log('error', error);
        throw new Error('Неверный пароль');
      }
    } else throw new Error('Пользователь не авторизован');
  },

  resetPassword: async (email: string) => {
    if (firebaseApp) {
      try {
        await sendPasswordResetEmail(auth, email);
        return 'Письмо отправлено на указанную почту';
      } catch (error: any) {
        if (error.message === 'Firebase: Error (auth/user-not-found).')
          throw new Error('Пользователь не найден, зарегистрируйтесь');
        else throw new Error(error.message);
      }
    } else throw new Error('Что-то пошло не так');
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
          dispatch(setAuthCallback(true));
          dispatch(setUserCallback(user));
          dispatch(setInitCallback(true));
        } else {
          dispatch(setAuthCallback(false));
          dispatch(setInitCallback(true));
        }
      });
    }
  },
};
