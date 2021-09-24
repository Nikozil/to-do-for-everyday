import React from 'react';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import styles from './LoginPage.module.css';
import Logo from '../../../assets/Logo.png';
import LogoComponent from '../../../assets/LogoComponent/LogoComponent';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <LogoComponent className={styles.logo} />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
