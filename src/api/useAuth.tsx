import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from '@firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirebase, getReCaptcha } from '../firebase';
import { InputType } from '../hooks/useInput';

export const firebaseApp = getFirebase();
export const auth = getAuth();
const appCheck = getReCaptcha(firebaseApp);

const authContext = createContext({} as AuthType);

export const ProvideAuth: React.FC = ({ children }) => {
  const authProvide = useProvideAuth();
  return (
    <authContext.Provider value={authProvide}>{children}</authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState<UserState>(null);

  const signin =
    (email: InputType, password: InputType) =>
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (firebaseApp) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          const responseUser = userCredential.user;
          setUser(responseUser);
          console.log('user', responseUser);
          alert(`Welcome back! ${responseUser.email}`);
        } catch (error) {
          console.log('error', error);
        }
      }
    };

  const signout = async () => {
    if (firebaseApp) {
      try {
        console.log(auth);

        const responce = await signOut(auth);
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const updatepassword =
    (newPassword: string) =>
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (firebaseApp) {
        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            const response = await updatePassword(currentUser, newPassword);
          } else throw new Error('Пользователь не авторизован');
        } catch (error) {
          console.log('error', error);
        }
      }
    };

  useEffect(() => {
    if (firebaseApp) {
      const usubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(false);
        }
      });
      return () => {
        usubscribe();
      };
    }
  }, []);
  return {
    user,
    signin,
    signout,
    updatepassword,
  };
};

interface UserType {}
type UserState = UserType | null;

interface AuthType {
  user: UserState;
  signin: (
    email: InputType,
    password: InputType
  ) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signout: () => Promise<void>;
  updatepassword: (
    newPassword: string
  ) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
