import RoutingContainer from './RoutingContainer';
import {
  render,
  screen,
  userReducerInitialState as initialState,
} from './utils/tests/test-utils';

describe('RoutingContainer tests', () => {
  it('default routing must show Logo', () => {
    render(<RoutingContainer />);
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    expect(screen.queryByText(/Email/i)).not.toBeInTheDocument();
  });
  it('if not authorized  routing must show LoginPage', () => {
    render(<RoutingContainer />, {
      preloadedState: {
        user: { ...initialState, initStatus: true, authStatus: false },
      },
    });
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });
  it('if  authorized  routing must show ContentPage', () => {
    render(<RoutingContainer />, {
      preloadedState: {
        user: {
          ...initialState,
          initStatus: true,
          authStatus: true,
        },
      },
    });
    expect(screen.getByText(/Список дел/i)).toBeInTheDocument();
  });
  it('if  authorized and pathname(/table)  routing must show TablePage', () => {
    render(<RoutingContainer />, {
      preloadedState: {
        user: { ...initialState, initStatus: true, authStatus: true },
      },
      route: '/table',
    });
    expect(screen.getByText(/Таблица/i)).toBeInTheDocument();
  });
});
