import userEvent from '@testing-library/user-event';
import { LivedTask, Task } from '../../Redux/modules/tasksSlice';
import { render, screen, waitFor } from '../../utils/tests/test-utils';

import {
  CheckButton,
  DeleteButton,
  RepeatButton,
  UncheckButton,
} from './Buttons';

const testTask = { id: '123', data: { name: 'task0', repeat: 0 } } as Task;
const testDoneTask = { id: '123', name: 'task0' } as LivedTask;
const clickHandler = jest.fn();

describe('Buttons tests', () => {
  describe('Delete button', () => {
    it('rendering and click delete', async () => {
      render(<DeleteButton task={testTask} clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('delete-button'));
      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();

        expect(clickHandler).toHaveBeenCalledWith(testTask.id);
      });
    });
  });
  describe('Repeat button', () => {
    it('rendering and click repeat', async () => {
      render(<RepeatButton task={testTask} clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('repeat-button'));

      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();

        expect(clickHandler).toHaveBeenCalledWith('123', { repeat: 1 });
      });
    });
  });
  describe('Check button', () => {
    it('rendering and click check', async () => {
      render(<CheckButton task={testTask} clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('check-button'));

      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();

        expect(clickHandler).toHaveBeenCalledWith(testTask);
      });
    });
  });
  describe('Uncheck button', () => {
    it('rendering and click uncheck', async () => {
      render(<UncheckButton task={testDoneTask} clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('uncheck-button'));

      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();

        expect(clickHandler).toHaveBeenCalledWith(testDoneTask);
      });
    });
  });
});
