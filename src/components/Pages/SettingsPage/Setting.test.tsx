import { render } from '../../../utils/tests/test-utils';
import SettingsPage from './SettingsPage';

describe('Settings Page tests', () => {
  it('render correct', () => {
    const { asFragment } = render(<SettingsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
