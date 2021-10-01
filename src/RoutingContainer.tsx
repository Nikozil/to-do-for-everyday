import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PreloaderPage from './assets/PreloaderPage/PreloaderPage';
import AppPage from './components/AppPage/AppPage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import { useRequireAuth } from './hooks/useRequireAuth';
import { updateUserData } from './Redux/modules/userReducer';

const RoutingContainer: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useRequireAuth();

  useEffect(() => {
    dispatch(updateUserData());
  });

  if (auth === null) {
    return <PreloaderPage />;
  }

  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/">
        <AppPage />
      </Route>
    </Switch>
  );
};
export default RoutingContainer;
