import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import RegistrationForm from './RegistrationForm';

const handleRegistration = jest.fn();

describe('RegistrationForm tests', () => {
  describe('SignUp', () => {
    it('rendering and submitting', async () => {
      render(<RegistrationForm handleSubmit={handleRegistration} />);

      userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
      userEvent.type(screen.getByLabelText(/password/i), 'password');
      userEvent.click(screen.getByLabelText(/Запомнить сессию/i));

      userEvent.click(
        screen.getByRole('button', { name: /Зарегистрироваться/i })
      );

      await waitFor(() => {
        expect(handleRegistration).toHaveBeenCalled();

        expect(handleRegistration).toHaveBeenCalledWith(
          'test@test.com',
          'password',
          true
        );
      });
    });
  });
});
