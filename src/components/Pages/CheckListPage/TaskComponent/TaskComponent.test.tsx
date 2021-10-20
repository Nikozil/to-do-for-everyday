import { render, screen, waitFor } from '../../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';

import TaskComponent from './TaskComponent';
const checkHandler = jest.fn();
const deleteHandler = jest.fn();
describe('NewTaskForm tests', () => {
  it('rendering and click delete', async () => {
    render(
      <TaskComponent
        id={'123'}
        name={'Task'}
        done={false}
        checkHandler={checkHandler}
        deleteHandler={deleteHandler}
      />
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(deleteHandler).toHaveBeenCalled();

      expect(deleteHandler).toHaveBeenCalledWith('123');
    });
  });
  it('rendering and click check', async () => {
    render(
      <TaskComponent
        id={'123'}
        name={'Task'}
        done={false}
        checkHandler={checkHandler}
        deleteHandler={deleteHandler}
      />
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('check-button'));

    await waitFor(() => {
      expect(checkHandler).toHaveBeenCalled();

      expect(checkHandler).toHaveBeenCalledWith('123', { done: true });
    });
  });
});
