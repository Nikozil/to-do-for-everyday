import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import {
  validateConfirmPassword,
  validatePassword,
} from '../../../utils/validators/authValidators';

const ChangePasswordForm: React.FC<PropsType> = ({ handleSubmit }) => {
  const initialValues: MyFormValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus, resetForm }) => {
        let response = await handleSubmit(
          values.oldPassword,
          values.newPassword
        );

        resetForm();
        setStatus(response);
      }}>
      {({ errors, touched, isValidating, status, handleChange, values }) => (
        <Form>
          <div className="mb-1">
            <label htmlFor="oldPassword" className={'form-label'}>
              Старый пароль
            </label>
            <Field
              id="oldPassword"
              name="oldPassword"
              placeholder=""
              type="password"
              className="form-control"
              validate={validatePassword}
            />
          </div>
          <div className="form-text" style={{ height: '21px' }}>
            <ErrorMessage name="oldPassword" />
          </div>
          <div className="mb-1">
            <label htmlFor="newPassword" className={'form-label'}>
              Новый пароль
            </label>
            <Field
              id="newPassword"
              name="newPassword"
              placeholder=""
              type="password"
              className="form-control"
              validate={validatePassword}
            />
          </div>
          <div className="form-text" style={{ height: '21px' }}>
            <ErrorMessage name="newPassword" />
          </div>
          <div className="mb-1">
            <label htmlFor="confirmNewPassword" className={'form-label'}>
              Подтвердите новый пароль
            </label>
            <Field
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder=""
              type="password"
              className="form-control"
              validate={(value: string) =>
                validateConfirmPassword(values.newPassword, value)
              }
            />
          </div>
          <div className="form-text" style={{ height: '21px' }}>
            <ErrorMessage name="confirmNewPassword" />

            {status && <>{status}</>}
          </div>

          <div className={'text-center my-2'}>
            <button type="submit" className={'btn btn-success center-block'}>
              Изменить
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;

interface MyFormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
interface PropsType {
  handleSubmit: (oldPassword: string, newPassword: string) => any;
}
