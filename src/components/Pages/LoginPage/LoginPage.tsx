import React from 'react';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import styles from './LoginPage.module.css';
import Logo from '../../../assets/Logo.png';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
