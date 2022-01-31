import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PreloaderPage from './common_components/PreloaderPage/PreloaderPage';
// import AppPage from './components/AppPage/AppPage';
// import LoginPage from './components/Pages/LoginPage/LoginPage';
import { useRequireAuth } from './hooks/useRequireAuth';
import { updateUserData } from './Redux/modules/userSlice';
import { selectUserInitStatus } from './Redux/selectors/userSelector';

const AppPage = React.lazy(() => import('./components/AppPage/AppPage'));
const LoginPage = React.lazy(
  () => import('./components/Pages/LoginPage/LoginPage')
);

const RoutingContainer: React.FC = () => {
  const dispatch = useDispatch();

  const initUserStatus = useSelector(selectUserInitStatus);

  useRequireAuth();

  useEffect(() => {
    dispatch(updateUserData());
  }, [dispatch]);

  if (!initUserStatus) {
    return <PreloaderPage />;
  }

  return (
    <Suspense fallback={<PreloaderPage />}>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <AppPage />
        </Route>
      </Switch>
    </Suspense>
  );
};
export default RoutingContainer;
