import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../utils/tests/test-utils';
import Paginator from './Paginator';

const clickHandler = jest.fn();

describe('Paginator tests', () => {
  it('rendering and click', async () => {
    render(
      <Paginator
        pageNames={[1, 2, 3, 4, 5]}
        currentPage={2}
        clickHandler={clickHandler}
      />
    );
    expect(
      screen.getByText(/2/i).classList.contains('paginator__name_active')
    ).toBe(true);

    userEvent.click(screen.getByText(/3/i));
    await waitFor(() => {
      expect(clickHandler).toHaveBeenCalled();

      expect(clickHandler).toHaveBeenCalledWith(3);
    });
  });
});
