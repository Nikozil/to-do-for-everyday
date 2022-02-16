import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/tests/test-utils';

import {
  CheckButton,
  DeleteButton,
  DoItAgainButton,
  UncheckButton,
} from './Buttons';

const clickHandler = jest.fn();

describe('Buttons tests', () => {
  describe('Delete button', () => {
    it('rendering and click delete', async () => {
      render(<DeleteButton clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('delete-button'));
      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();
      });
    });
  });
  // describe('Repeat button', () => {
  //   it('rendering and click repeat', async () => {
  //     render(<RepeatButton task={testTask} clickHandler={clickHandler} />);
  //     userEvent.click(screen.getByTestId('repeat-button'));

  //     await waitFor(() => {
  //       expect(clickHandler).toHaveBeenCalled();

  //       expect(clickHandler).toHaveBeenCalledWith('123', { repeat: 1 });
  //     });
  //   });
  // });
  describe('Check button', () => {
    it('rendering and click check', async () => {
      render(<CheckButton clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('check-button'));

      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();
      });
    });
  });
  describe('Uncheck button', () => {
    it('rendering and click uncheck', async () => {
      render(<UncheckButton clickHandler={clickHandler} />);
      userEvent.click(screen.getByTestId('uncheck-button'));

      await waitFor(() => {
        expect(clickHandler).toHaveBeenCalled();
      });
    });
    describe('DoItAgain button', () => {
      it('rendering and click again', async () => {
        render(<DoItAgainButton clickHandler={clickHandler} />);
        userEvent.click(screen.getByTestId('again-button'));

        await waitFor(() => {
          expect(clickHandler).toHaveBeenCalled();
        });
      });
    });
  });
});
