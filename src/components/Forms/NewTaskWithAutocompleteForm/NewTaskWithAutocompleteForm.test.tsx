import React from 'react';

import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';
import NewTaskWithAutocompleteForm from './NewTaskWithAutocompleteForm';

describe('NewTaskWithAutocompleteForm tests', () => {
  it('rendering', async () => {
    const { asFragment } = render(
      <NewTaskWithAutocompleteForm duration={{ days: 0 }} />
    );

    userEvent.type(
      screen.getByPlaceholderText(/Новая Задача/i),
      'New Task{enter}'
    );

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
