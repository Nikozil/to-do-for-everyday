import { initialState } from './Redux/modules/userSlice';
import RoutingContainer from './RoutingContainer';
import { render, screen } from './utils/tests/test-utils';

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
    expect(
      screen.getByRole('heading', { name: /Сегодня/i })
    ).toBeInTheDocument();
  });
  it('if  authorized and pathname(/tomorrowList)  routing must show tomorrow list page', () => {
    render(<RoutingContainer />, {
      preloadedState: {
        user: { ...initialState, initStatus: true, authStatus: true },
      },
      route: '/tomorrowList',
    });
    expect(screen.getByRole('heading', { name: /Планы/i })).toBeInTheDocument();
  });
});
