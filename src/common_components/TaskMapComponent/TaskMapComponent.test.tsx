import { LivedTask } from '../../Redux/modules/tasksSlice';
import { render } from '../../utils/tests/test-utils';
import TaskMapComponent from './TaskMapComponent';

const list = [
  { id: '123', name: 'task1' },
  { id: '567', name: 'task2' },
] as LivedTask[];
const callback = (task: LivedTask) => <div>{task.name}</div>;

describe('Task Component tests', () => {
  it('rendering empty list', async () => {
    const { asFragment } = render(
      <TaskMapComponent list={[]} stub={'Empty'} callback={callback} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('rendering full list', async () => {
    const { asFragment } = render(
      <TaskMapComponent list={list} stub={'Empty'} callback={callback} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
