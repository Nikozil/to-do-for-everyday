import { render, waitFor } from '../../../utils/tests/test-utils';
import RegistrationPage from './RegistrationPage';

describe('Login Page tests', () => {
  it('render correct', async () => {
    const { asFragment } = render(<RegistrationPage />);

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
