import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import store from './Redux/store';
import RoutingContainer from './RoutingContainer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutingContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
