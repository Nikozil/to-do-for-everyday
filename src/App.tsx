import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PreloaderPage from './assets/PreloaderPage/PreloaderPage';
import AppPage from './components/AppPage/AppPage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import { useRequireAuth } from './hooks/useRequireAuth';
import store from './Redux/store';
import { updateUserData } from './Redux/modules/userReducer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteContainer />
      </BrowserRouter>
    </Provider>
  );
};

const RouteContainer: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useRequireAuth();

  useEffect(() => {
    dispatch(updateUserData());
  }, []);

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

export default App;
