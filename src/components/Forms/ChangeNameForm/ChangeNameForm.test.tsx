import React from 'react';

import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';
import ChangeNameForm from './ChangeNameForm';

const handleSubmit = jest.fn();
const displayName = 'displayName';

describe('ChangeNameForm tests', () => {
  it('rendering and submitting', async () => {
    render(
      <ChangeNameForm displayName={displayName} handleSubmit={handleSubmit} />
    );
    expect(screen.getByDisplayValue(/displayName/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Имя/i), '{selectall}{backspace}');
    userEvent.type(screen.getByLabelText(/Имя/i), 'newDisplayName');

    userEvent.click(screen.getByRole('button', { name: /Изменить/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();

      expect(handleSubmit).toHaveBeenCalledWith('NewDisplayName');
    });
  });
});
