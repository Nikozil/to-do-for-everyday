import React from 'react';

import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';
import ChangeTagForm from './ChangeTagForm';

const handleSubmit = jest.fn();

describe('ChangeTagForm tests', () => {
  it('rendering and submitting', async () => {
    render(<ChangeTagForm tag={'Happy'} handleSubmit={handleSubmit} />);
    expect(screen.getByDisplayValue(/Happy/i)).toBeInTheDocument();

    userEvent.type(
      screen.getByPlaceholderText(/Tag/i),
      '{selectall}{backspace}'
    );
    userEvent.type(screen.getByPlaceholderText(/Tag/i), 'Very happy{enter}');

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();

      expect(handleSubmit).toHaveBeenCalledWith('Very happy');
    });
  });
});
