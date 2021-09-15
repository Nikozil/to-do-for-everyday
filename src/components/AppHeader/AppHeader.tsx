import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../api/useAuth';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  const auth = useAuth();
  const signout = () => {
    auth.signout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.username}>UserName</div>
      <div className={styles.login}>
        {/* <Link to="/login" className="link-dark">
          Login
        </Link> */}
        <button onClick={signout}>Sign out</button>
      </div>
    </header>
  );
};

export default AppHeader;
