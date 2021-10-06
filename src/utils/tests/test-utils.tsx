import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import userReducer from '../../Redux/modules/userReducer';
import { User } from '@firebase/auth/dist/auth-exp-public';
import React, { ReactElement } from 'react';

const render = (
  ui: ReactElement,
  {
    preloadedState,
    store = createStore(
      combineReducers({
        user: userReducer,
      }),
      preloadedState,
      applyMiddleware(reduxThunk)
    ),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {} as WrapperRenderOptions
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children} </Router>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

//userReducer initial state
export let userReducerInitialState = {
  userData: {
    displayName: null,
    email: null,
  } as User,
  authStatus: false,
  initStatus: false,
  loginError: null,
};

//Types
interface WrapperOptions {
  preloadedState?: any;
  store?: any;
  route?: string;
  history?: MemoryHistory<unknown>;
}
interface WrapperRenderOptions
  extends WrapperOptions,
    Omit<RenderOptions, 'wrapper'> {}
