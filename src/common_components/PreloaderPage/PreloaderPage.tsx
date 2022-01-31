import React from 'react';
import LogoComponent from '../LogoComponent/LogoComponent';
import styles from './PreloaderPage.module.scss';

const PreloaderPage = () => {
  return (
    <div className={styles['preloader']}>
      <div className={styles['preloader__content']}>
        <LogoComponent className={styles['preloader__logo']} />
      </div>
    </div>
  );
};

export default PreloaderPage;
