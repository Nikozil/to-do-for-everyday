import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import userSlice, { UserData } from '../../Redux/modules/userSlice';

const reducer = {
  user: userSlice.reducer,
};
const render = (
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer,
      middleware: [reduxThunk],
      preloadedState,
    }),
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
export let userSliceInitialState = {
  userData: {
    uid: '',
    displayName: null,
    email: null,
  } as UserData,
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
