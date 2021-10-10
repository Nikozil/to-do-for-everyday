import { Field, Form, Formik } from 'formik';
import React from 'react';
const ChangeNameForm: React.FC<PropsType> = ({ displayName, handleSubmit }) => {
  const initialValues: MyFormValues = {
    displayName: displayName || '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        await handleSubmit(values.displayName);
      }}>
      {({ errors, touched, isValidating, status }) => (
        <Form>
          <div className="mb-1">
            <label htmlFor="displayName" className={'form-label'}>
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

export default ChangeNameForm;

interface MyFormValues {
  displayName: string;
}
interface PropsType {
  displayName: string | null;
  handleSubmit: (displayName: string) => void;
}
