import { render, screen, waitFor } from '../../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';

import TomorrowTaskComponent from './TomorrowTaskComponent';
import { Task } from '../../../../Redux/modules/tasksSlice';

const testTask = { id: '123', data: { name: 'task0', repeat: 0 } } as Task;
const repeatHandler = jest.fn();
const deleteHandler = jest.fn();
describe('TomorrowTaskComponent tests', () => {
  it('rendering and click uncheck', async () => {
    render(
      <TomorrowTaskComponent
        task={testTask}
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
  it('rendering and click repeat', async () => {
    render(
      <TomorrowTaskComponent
        task={testTask}
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
