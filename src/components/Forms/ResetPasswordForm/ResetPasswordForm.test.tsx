import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import ResetPasswordForm from './ResetPasswordForm';

const handleResetPassword = jest.fn();

describe('ResetPasswordForm tests', () => {
  describe('Reset password', () => {
    it('rendering and submitting', async () => {
      render(<ResetPasswordForm handleSubmit={handleResetPassword} />);

      userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');

      userEvent.click(
        screen.getByRole('button', { name: /Отправить пароль на почту/i })
      );

      await waitFor(() => {
        expect(handleResetPassword).toHaveBeenCalled();

        expect(handleResetPassword).toHaveBeenCalledWith('test@test.com');
      });
    });
  });
});
