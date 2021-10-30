import { render, screen, waitFor } from '../../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';

import TaskComponent from './TaskComponent';
import { Task } from '../../../../Redux/modules/tasksSlice';
const testTask = { id: '123', data: { name: 'task0', repeat: 0 } } as Task;
const checkHandler = jest.fn();
const repeatHandler = jest.fn();
const deleteHandler = jest.fn();
describe('NewTaskForm tests', () => {
  it('rendering and click delete', async () => {
    render(
      <TaskComponent
        task={testTask}
        checkHandler={checkHandler}
        repeatHandler={repeatHandler}
        deleteHandler={deleteHandler}
      />
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(deleteHandler).toHaveBeenCalled();

      expect(deleteHandler).toHaveBeenCalledWith(testTask.id);
    });
  });
  it('rendering and click check', async () => {
    render(
      <TaskComponent
        task={testTask}
        checkHandler={checkHandler}
        repeatHandler={repeatHandler}
        deleteHandler={deleteHandler}
      />
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('check-button'));

    await waitFor(() => {
      expect(checkHandler).toHaveBeenCalled();

      expect(checkHandler).toHaveBeenCalledWith(testTask);
    });
  });
  it('rendering and click repeat', async () => {
    render(
      <TaskComponent
        task={testTask}
        checkHandler={checkHandler}
        repeatHandler={repeatHandler}
        deleteHandler={deleteHandler}
      />
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('repeat-button'));

    await waitFor(() => {
      expect(repeatHandler).toHaveBeenCalled();

      expect(repeatHandler).toHaveBeenCalledWith(testTask.id);
    });
  });
});
