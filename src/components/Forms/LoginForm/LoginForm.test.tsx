import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { useAuth } from '../../../api/useAuth';
import React from 'react';

const mockSignin = jest.fn();

jest.mock('../../../api/useAuth', () => {
  const originalModule = jest.requireActual('../../../api/useAuth');

  const mockUseAuth = () => ({
    signin: mockSignin,
  });

  return { ...originalModule, useAuth: mockUseAuth };
});
describe('LoginForm tests', () => {
  it('rendering and submitting', async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByLabelText(/Запомнить сессию/i));

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalled();

      expect(mockSignin).toHaveBeenCalledWith(
        'test@test.com',
        'password',
        true
      );
    });
  });

  it('rendering and enter wrongEmail', async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByLabelText(/email/i), 'test.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockSignin).not.toHaveBeenCalled();
      expect(screen.getByText(/Неверный email/i));
    });
  });

  it('email and password not entered', async () => {
    render(<LoginForm />);

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockSignin).not.toHaveBeenCalled();
      expect(screen.getByText(/Email не указан/i));
      expect(screen.getByText(/Пароль не указан/i));
    });
  });
});
