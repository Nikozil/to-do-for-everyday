export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Email не указан';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Неверный email';
  }
  return error;
}
export function validatePassword(value: string) {
  let error;
  if (!value) {
    error = 'Пароль не указан';
  }

  return error;
}
