import React from 'react';
import { useDispatch } from 'react-redux';
import LogoComponent from '../../../assets/LogoComponent/LogoComponent';
import { signIn } from '../../../Redux/modules/userSlice';
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
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <LogoComponent className={styles.logo} />
        <LoginForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;
