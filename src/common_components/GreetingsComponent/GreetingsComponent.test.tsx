import { render } from '../../utils/tests/test-utils';
import GreetingsComponent from './GreetingsComponent';

describe('GreetingsComponent tests', () => {
  it('render correct', () => {
    const { asFragment } = render(<GreetingsComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
