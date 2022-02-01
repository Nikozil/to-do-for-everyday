import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  validateEmail,
  validatePassword,
} from '../../../utils/validators/authValidators';
import styles from './RegistrationForm.module.scss';
import cn from 'classnames';

const RegistrationForm: React.FC<PropsType> = ({ handleSubmit }) => {
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
              Зарегистрироваться
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
interface MyFormValues {
  email: string;
  password: string;
  remember: boolean;
}
interface PropsType {
  handleSubmit: (email: string, password: string, remember: boolean) => void;
}
