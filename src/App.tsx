import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProvideAuth } from './api/useAuth';
import './App.css';
import AppPage from './components/AppPage';
import Login from './components/Pages/LoginPage/LoginPage';
import store from './Redux/store';

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" render={() => <Login />}></Route>
            <Route path="/">
              <div className="App app-wrapper">
                <AppPage />
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </ProvideAuth>
  );
};

export default App;
