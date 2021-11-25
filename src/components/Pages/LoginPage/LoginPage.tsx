import React from 'react';
import { useDispatch } from 'react-redux';

import {
  resetPassword,
  signIn,
  signUp,
} from '../../../Redux/modules/userSlice';
import LogoComponent from '../../../assets/LogoComponent/LogoComponent';

import LoginForm from '../../Forms/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    const response = await dispatch(signIn(email, password, remember));
    return response;
  };
  const handleRegistration = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    const response = await dispatch(signUp(email, password, remember));
    return response;
  };
  const handleResetPassword = async (email: string) => {
    const response = await dispatch(resetPassword(email));
    return response;
  };
  return (
    <div className={styles['login-page']}>
      <div className={styles['login-page__content']}>
        <LogoComponent className={styles['login-page__logo']} />
        <LoginForm
          handleSubmit={handleSubmit}
          handleRegistration={handleRegistration}
          handleResetPassword={handleResetPassword}
        />
      </div>
    </div>
  );
};

export default LoginPage;
