import React from 'react';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import AppContent from '../AppContent/AppContent';
import AppHeader from '../AppHeader/AppHeader';
import AppSidebar from '../AppSidebar/AppSidebar';
import PreloaderPage from '../../assets/PreloaderPage/PreloaderPage';
import styles from './AppPage.module.css';

const AppPage: React.FC = () => {
  const auth = useRequireAuth();
  if (auth.user === null) {
    return <PreloaderPage />;
  }
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
