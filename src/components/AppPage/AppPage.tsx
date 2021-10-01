import React from 'react';
import AppContent from '../AppContent/AppContent';
import AppHeader from '../AppHeader/AppHeader';
import AppSidebar from '../AppSidebar/AppSidebar';
import styles from './AppPage.module.scss';

const AppPage: React.FC = () => {
  return (
    <>
      <div className={styles['app-wrapper']}>
        <AppHeader />
        <AppSidebar />
        <AppContent />
      </div>
    </>
  );
};

export default AppPage;
