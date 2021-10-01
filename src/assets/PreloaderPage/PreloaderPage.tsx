import React from 'react';
import LogoComponent from '../LogoComponent/LogoComponent';
import styles from './PreloaderPage.module.scss';

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
