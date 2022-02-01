import cn from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { validateEmail } from '../../../utils/validators/authValidators';
import styles from './ResetPasswordForm.module.scss';

const ResetPasswordForm: React.FC<PropsType> = ({ handleSubmit }) => {
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
        const response = await handleSubmit(values.email);
        setStatus(response);
      }}>
      {({ status, values, isValid, setStatus, setFieldTouched, errors }) => (
        <Form>
          <div className="mb-3">
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
              {status && (
                <div className={styles['login-form__status']}>{status}</div>
              )}
            </div>
          </div>

          <div className={'d-flex flex-column mt-1 '}>
            <button type="submit" className={'btn btn-success center-block '}>
              Отправить пароль на почту
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
interface MyFormValues {
  email: string;
  password: string;
  remember: boolean;
}
interface PropsType {
  handleSubmit: (email: string) => void;
}
