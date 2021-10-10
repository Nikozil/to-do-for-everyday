import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from './authValidators';
describe('enter email', () => {
  it('enter wrong email', () => {
    const wrongEmail = [
      'wrongEmail',
      'wrongEmail@mail',
      'wrongEmail@mail.com1',
      'wrongEmail@mail.abcde',
      '@mail.com',
    ];
    wrongEmail.forEach((email) => {
      expect(validateEmail(email)).toMatch(/Неверный email/);
    });
  });

  it('enter correct email', () => {
    expect(validateEmail('guest@mail.ru')).toBeUndefined();
  });
  it('enter empty email', () => {
    expect(validateEmail('')).toMatch(/Email не указан/);
  });
});

describe('enter password', () => {
  it('enter empty password', () => {
    expect(validatePassword('')).toMatch(/Пароль не указан/);
  });
  it('enter noempty password', () => {
    expect(validatePassword('Password')).toBeUndefined();
  });
});
describe('confirm password', () => {
  it('enter different  password', () => {
    expect(validateConfirmPassword('Password', 'Pasword')).toMatch(
      /Пароль не совпадает/
    );
  });
  it('enter identical  password', () => {
    expect(validateConfirmPassword('Password', 'Password')).toBeUndefined();
  });
});
