import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  validateEmail,
  validatePassword,
} from '../../../utils/validators/authValidators';
import styles from './LoginForm.module.scss';
import cn from 'classnames';

const LoginForm: React.FC<PropsType> = ({
  handleSubmit,
  handleRegistration,
  handleResetPassword,
}) => {
  const initialValues: MyFormValues = {
    email: '',
    password: '',
    remember: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount={true}
      onSubmit={async (values, { setStatus }) => {
        const response = await handleSubmit(
          values.email,
          values.password,
          values.remember
        );
        setStatus(response);
      }}>
      {({ status, values, isValid, setStatus, setFieldTouched, errors }) => (
        <Form>
          <div className="mb-1">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="guest@gmail.com"
              type="email"
              validate={validateEmail}
              className="form-control"
            />
            <div className={cn('form-text', styles['login-form__error'])}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              placeholder=""
              type="password"
              validate={validatePassword}
              className="form-control"
            />
            <div className={cn('form-text', styles['login-form__error'])}>
              <ErrorMessage name="password" />
              {status && (
                <div className={styles['login-form__status']}>{status}</div>
              )}
            </div>
          </div>

          <div className="mb-1 form-check">
            <label className="form-check-label">
              <Field
                type="checkbox"
                name="remember"
                className="form-check-input"
              />
              Запомнить сессию
            </label>
          </div>

          <div className={'d-flex flex-column mt-1 '}>
            <button type="submit" className={'btn btn-success center-block '}>
              Войти
            </button>
            <div className={'d-flex justify-content-between my-2'}>
              <button
                type="button"
                className={'btn btn-secondary'}
                onClick={async () => {
                  setFieldTouched('email');
                  setFieldTouched('password');
                  if (isValid) {
                    const response = await handleRegistration(
                      values.email,
                      values.password,
                      values.remember
                    );
                    setStatus(response);
                  }
                }}>
                Регистрация
              </button>
              <button
                type="button"
                className={'btn btn-secondary'}
                onClick={async () => {
                  setFieldTouched('email');
                  if (!errors.email) {
                    const response = await handleResetPassword(values.email);
                    setStatus(response);
                  }
                }}>
                Восстановить пароль
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
interface MyFormValues {
  email: string;
  password: string;
  remember: boolean;
}
interface PropsType {
  handleSubmit: (email: string, password: string, remember: boolean) => void;
  handleRegistration: (
    email: string,
    password: string,
    remember: boolean
  ) => void;
  handleResetPassword: (email: string) => void;
}
