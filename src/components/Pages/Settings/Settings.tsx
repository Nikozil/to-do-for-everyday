import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../Redux/modules/userReducer';
import { AppStateType } from '../../../Redux/store';

const Settings = () => {
  const user = useSelector((state: AppStateType) => state.user.user);
  const dispatch = useDispatch();
  const initialValues: MyFormValues = {
    displayName: user ? user.displayName || '' : '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        await dispatch(updateProfile(values.displayName));
        //@ts-ignore
        console.log('foem', user.displayName);
      }}>
      {({ errors, touched, isValidating, status }) => (
        <Form>
          <div className="mb-1">
            {user ? user.displayName || user.email : 'Аноним'}
            <br />
            <label htmlFor="email" className="form-label">
              Имя
            </label>
            <Field
              id="displayName"
              name="displayName"
              placeholder="Имя"
              type="displayName"
              className="form-control"
            />
          </div>

          <div className={'text-center mb-1'}>
            <button type="submit" className={'btn btn-success center-block'}>
              Изменить
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Settings;

interface MyFormValues {
  displayName: string;
}
