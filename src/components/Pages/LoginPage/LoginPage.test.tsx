import { render, waitFor } from '../../../utils/tests/test-utils';
import LoginPage from './LoginPage';

describe('Login Page tests', () => {
  it('render correct', async () => {
    const { asFragment } = render(<LoginPage />);

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
