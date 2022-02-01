import React from 'react';
import { Link } from 'react-router-dom';
import LogoComponent from '../LogoComponent/LogoComponent';
import styles from './GreetingsComponent.module.scss';

const GreetingsComponent: React.FC = ({ children }) => {
  return (
    <div className={styles['greeting-page']}>
      <div className={styles['greeting-page__content']}>
        <Link to="/">
          <LogoComponent className={styles['greeting-page__logo']} />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default GreetingsComponent;
