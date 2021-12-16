import React, { ReactElement } from 'react';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import clockSlice from '../../Redux/modules/clockSlice';
import historySlice from '../../Redux/modules/historySlice';
import tasksSlice from '../../Redux/modules/tasksSlice';
import userSlice from '../../Redux/modules/userSlice';
import { AppStateType } from '../../Redux/store';

const reducer = {
  user: userSlice.reducer,
  tasks: tasksSlice.reducer,
  clock: clockSlice.reducer,
  history: historySlice.reducer,
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

//Types
interface WrapperOptions {
  preloadedState?: Partial<AppStateType>;
  store?: EnhancedStore<AppStateType>;
  route?: string;
  history?: MemoryHistory<unknown>;
}
interface WrapperRenderOptions
  extends WrapperOptions,
    Omit<RenderOptions, 'wrapper'> {}
