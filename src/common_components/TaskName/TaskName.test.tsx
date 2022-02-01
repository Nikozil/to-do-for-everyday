import { render } from '../../utils/tests/test-utils';
import TaskName from './TaskName';

describe('TaskName tests', () => {
  it('rendering and click delete', async () => {
    const { asFragment } = render(<TaskName>Task</TaskName>);

    expect(asFragment()).toMatchSnapshot();
  });
});
