import React from 'react';

import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';
import NewTaskForm from './NewTaskForm';

const handleSubmit = jest.fn();

describe('NewTaskForm tests', () => {
  it('rendering and submitting', async () => {
    render(<NewTaskForm handleSubmit={handleSubmit} />);
    userEvent.type(
      screen.getByPlaceholderText(/Новая Задача/i),
      'New Task{enter}'
    );

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();

      expect(handleSubmit).toHaveBeenCalledWith('New Task');
      expect(screen.queryByDisplayValue(/New Task/i)).not.toBeInTheDocument();
    });
  });
});
