import React from 'react';

import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';
import ChangeScoreForm from './ChangeScoreForm';

const handleSubmit = jest.fn();

describe('ChangeScoreForm tests', () => {
  it('rendering and submitting', async () => {
    render(<ChangeScoreForm score={3} handleSubmit={handleSubmit} />);
    expect(screen.getByDisplayValue(/3/i)).toBeInTheDocument();

    userEvent.click(screen.getByDisplayValue(/4/i));

    await waitFor(() => {
      expect(screen.getByDisplayValue(/4/i)).toBeChecked();

      expect(handleSubmit).toHaveBeenCalled();

      expect(handleSubmit).toHaveBeenCalledWith('4');
    });
  });
});
