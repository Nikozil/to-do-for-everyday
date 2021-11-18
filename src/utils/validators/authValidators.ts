export const validateEmail = (value: string): string | undefined => {
  let error;
  if (!value) {
    error = 'Email не указан';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Неверный email';
  }
  return error;
};
export const validatePassword = (value: string): string | undefined => {
  let error;

  if (!value) {
    error = 'Пароль не указан';
  }
  if (value && value.length < 6) {
    error = 'Пароль меньше 6 символов';
  }

  return error;
};
export const validateConfirmPassword = (
  value: string,
  confirmValue: string
): string | undefined => {
  let error;

  if (value !== confirmValue) {
    error = 'Пароль не совпадает';
  }

  return error;
};
