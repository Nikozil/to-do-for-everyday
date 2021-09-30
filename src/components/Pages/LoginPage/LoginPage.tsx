import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoComponent from '../../../assets/LogoComponent/LogoComponent';
import { AppStateType } from '../../../Redux/store';
import { signIn } from '../../../Redux/modules/userReducer';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const loginError = useSelector(
    (state: AppStateType) => state.user.loginError
  );
  const handleSubmit = (email: string, password: string, remember: boolean) => {
    dispatch(signIn(email, password, remember));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <LogoComponent className={styles.logo} />
        <LoginForm loginError={loginError} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
