import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PreloaderPage from './assets/PreloaderPage/PreloaderPage';
import AppPage from './components/AppPage/AppPage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import { useRequireAuth } from './hooks/useRequireAuth';
import { updateUserData } from './Redux/modules/userSlice';
import { AppStateType } from './Redux/store';

const RoutingContainer: React.FC = () => {
  const dispatch = useDispatch();
  useRequireAuth();
  const initStatus = useSelector(
    (state: AppStateType) => state.user.initStatus
  );

  useEffect(() => {
    dispatch(updateUserData());
  });

  if (!initStatus) {
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
