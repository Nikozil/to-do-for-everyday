import React from 'react';
import styles from './PreloaderPage.module.css';
import Logo from '../Logo.png';
import LogoComponent from '../LogoComponent/LogoComponent';

const PreloaderPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <LogoComponent className={styles.logo} />
      </div>
    </div>
  );
};

export default PreloaderPage;
