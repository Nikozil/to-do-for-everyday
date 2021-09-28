import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import {
  validateEmail,
  validatePassword,
} from '../../../utils/validators/authValidators';

const LoginForm: React.FC<PropsType> = ({ handleSubmit, loginError }) => {
  const initialValues: MyFormValues = {
    email: '',
    password: '',
    remember: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        handleSubmit(values.email, values.password, values.remember);
      }}>
      {({ errors, touched, isValidating, status }) => (
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
            <div className="form-text" style={{ height: '21px' }}>
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
            <div className="form-text" style={{ height: '21px' }}>
              <ErrorMessage name="password" />
              {loginError && <>{loginError}</>}
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

          <div className={'text-center mb-1'}>
            <button type="submit" className={'btn btn-success center-block'}>
              Войти
            </button>
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
  loginError: string | null;
}
