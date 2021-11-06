import React from 'react';
import { render } from '../../../../utils/tests/test-utils';
import TasksListComponent from './TasksListComponent';
import {
  initialState,
  LivedTask,
  Task,
} from '../../../../Redux/modules/tasksSlice';

const testTask = {
  id: '123',
  data: { name: 'task0', repeat: 0, done: false, time: new Date().getTime() },
} as Task;
const testDoneTask = { id: '123', name: 'task0' } as LivedTask;
describe('TasksListComponent', () => {
  it('render correct with tasks', async () => {
    const { asFragment } = render(<TasksListComponent />, {
      preloadedState: {
        tasks: {
          ...initialState,
          tasksList: [testTask],
          livedDay: { score: 3, tag: 'OHOHO', doneTasksList: [testDoneTask] },
        },
      },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('render correct without tasks', async () => {
    const { asFragment } = render(<TasksListComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
