import React from 'react';

import { render, screen, waitFor } from '../../../utils/tests/test-utils';
import userEvent from '@testing-library/user-event';
import ChangePasswordForm from './ChangePasswordForm';

const handleSubmit = jest.fn();

describe('ChangePasswordForm tests', () => {
  it('rendering and submitting', async () => {
    render(<ChangePasswordForm handleSubmit={handleSubmit} />);
    userEvent.type(screen.getByLabelText(/Старый пароль/i), 'oldPassword');
    userEvent.type(screen.getByLabelText(/^Новый пароль$/i), 'newPassword');
    userEvent.type(
      screen.getByLabelText(/Подтвердите новый пароль/i),
      'newPassword'
    );

    userEvent.click(screen.getByRole('button', { name: /Изменить/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();

      expect(handleSubmit).toHaveBeenCalledWith('oldPassword', 'newPassword');
    });
  });
  it('enter wrong oldPassword', async () => {
    handleSubmit.mockReturnValue('Неверный пароль');
    render(<ChangePasswordForm handleSubmit={handleSubmit} />);
    userEvent.type(screen.getByLabelText(/Старый пароль/i), 'wrongOldPassword');
    userEvent.type(screen.getByLabelText(/^Новый пароль$/i), 'newPassword');
    userEvent.type(
      screen.getByLabelText(/Подтвердите новый пароль/i),
      'newPassword'
    );

    userEvent.click(screen.getByRole('button', { name: /Изменить/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
      expect(screen.getByText(/Неверный пароль/i)).toBeInTheDocument();
    });
  });
  it('new password not entered', async () => {
    render(<ChangePasswordForm handleSubmit={handleSubmit} />);
    userEvent.type(screen.getByLabelText(/Старый пароль/i), 'oldPassword');
    userEvent.click(screen.getByRole('button', { name: /Изменить/i }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/Пароль не указан/i)).toBeInTheDocument();
    });
  });
  it('old password not entered', async () => {
    render(<ChangePasswordForm handleSubmit={handleSubmit} />);

    userEvent.type(screen.getByLabelText(/^Новый пароль$/i), 'newPassword');
    userEvent.click(screen.getByRole('button', { name: /Изменить/i }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/Пароль не указан/i)).toBeInTheDocument();
    });
  });
  it('confirm password wrong entered', async () => {
    render(<ChangePasswordForm handleSubmit={handleSubmit} />);
    userEvent.type(screen.getByLabelText(/Старый пароль/i), 'oldPassword');
    userEvent.type(screen.getByLabelText(/^Новый пароль$/i), 'newPassword');
    userEvent.type(
      screen.getByLabelText(/Подтвердите новый пароль/i),
      'newPasword'
    );
    userEvent.click(screen.getByRole('button', { name: /Изменить/i }));

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(screen.getByText(/Пароль не совпадает/i)).toBeInTheDocument();
    });
  });
});
