import React from 'react';
import { initialState, Task } from '../../../Redux/modules/tasksSlice';
import { render } from '../../../utils/tests/test-utils';
import TomorrowListPage from './TomorrowListPage';
const testTask = {
  id: '123',
  data: {
    name: 'task0',
    repeat: 0,
    done: false,
    time: new Date().getTime() + 86400000,
  },
} as Task;
describe('TomorrowListPage', () => {
  it('render correct with tasks', async () => {
    const { asFragment } = render(<TomorrowListPage />, {
      preloadedState: {
        tasks: {
          ...initialState,
          tasksList: [testTask],
          initStatus: true,
        },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('render correct without tasks', async () => {
    const { asFragment } = render(<TomorrowListPage />, {
      preloadedState: {
        tasks: {
          ...initialState,
          initStatus: true,
        },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('render correct without init', async () => {
    const { asFragment } = render(<TomorrowListPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
