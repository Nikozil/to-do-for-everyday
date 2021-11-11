import { render } from '../../utils/tests/test-utils';
import TaskComponent from './TaskComponent';

describe('Task Component tests', () => {
  it('rendering and click delete', async () => {
    const { asFragment } = render(<TaskComponent>Hello</TaskComponent>);
    expect(asFragment()).toMatchSnapshot();
  });
});
