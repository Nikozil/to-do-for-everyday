import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import AppContent from './AppContent/AppContent';
import AppHeader from './AppHeader/AppHeader';
import AppSidebar from './AppSidebar/AppSidebar';

const AppPage: React.FC = () => {
  const auth = useRequireAuth();
  if (!auth) {
    return <>Загрузка</>;
  }
  return (
    <>
      <AppHeader />
      <AppSidebar />
      <AppContent />
    </>
  );
};

export default AppPage;
