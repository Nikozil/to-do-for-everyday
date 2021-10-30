import { render, screen, waitFor } from '../../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';

import DoneTaskComponent from './DoneTaskComponent';
const uncheckHandler = jest.fn();
describe('NewTaskForm tests', () => {
  it('rendering and click uncheck', async () => {
    render(
      <DoneTaskComponent
        id={'123'}
        name={'Task'}
        uncheckHandler={uncheckHandler}
      />
    );
    expect(screen.getByText(/Task/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('uncheck-button'));

    await waitFor(() => {
      expect(uncheckHandler).toHaveBeenCalled();

      expect(uncheckHandler).toHaveBeenCalledWith('123');
    });
  });
});
