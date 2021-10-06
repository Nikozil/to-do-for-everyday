import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import LoginForm from './LoginForm';

const handleSubmit = jest.fn();
const loginError = null;

describe('LoginForm tests', () => {
  it('rendering and submitting', async () => {
    render(<LoginForm loginError={loginError} handleSubmit={handleSubmit} />);

    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByLabelText(/Запомнить сессию/i));

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();

      expect(handleSubmit).toHaveBeenCalledWith(
        'test@test.com',
        'password',
        true
      );
    });
  });

  it('rendering and enter wrongEmail', async () => {
    render(<LoginForm loginError={loginError} handleSubmit={handleSubmit} />);
    userEvent.type(screen.getByLabelText(/email/i), 'test.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/Неверный email/i)).toBeInTheDocument();
    });
  });

  it('email and password not entered', async () => {
    render(<LoginForm loginError={loginError} handleSubmit={handleSubmit} />);

    userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/Email не указан/i)).toBeInTheDocument();
      expect(screen.getByText(/Пароль не указан/i)).toBeInTheDocument();
    });
  });
  it('rendering error due to failed login', async () => {
    render(
      <LoginForm
        loginError={'Неверный логин или пароль'}
        handleSubmit={handleSubmit}
      />
    );
    expect(screen.getByText(/Неверный логин или пароль/i)).toBeInTheDocument();
  });
});
