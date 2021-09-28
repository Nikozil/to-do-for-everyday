import { render } from '../../../utils/tests/test-utils';
import LoginPage from './LoginPage';

describe('Login Page tests', () => {
  it('render correct', () => {
    const { asFragment } = render(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
