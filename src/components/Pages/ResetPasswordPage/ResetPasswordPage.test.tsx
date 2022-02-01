import { render, waitFor } from '../../../utils/tests/test-utils';
import ResetPasswordPage from './ResetPasswordPage';

describe('ResetPasswordPage tests', () => {
  it('render correct', async () => {
    const { asFragment } = render(<ResetPasswordPage />);

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
