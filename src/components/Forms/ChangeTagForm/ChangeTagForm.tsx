import { Field, Form, Formik } from 'formik';
import React from 'react';
const ChangeTagForm: React.FC<PropsType> = ({ tag, handleSubmit }) => {
  const initialValues: MyFormValues = {
    tag: tag || '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        await handleSubmit(values.tag);
      }}>
      {({ errors, touched, isValidating, status, handleSubmit }) => (
        <Form>
          <div className="row g-2 align-items-center">
            <div className="col-auto">
              <label htmlFor="tag" className="col-form-label-sm">
                #Tag дня:
              </label>
            </div>
            <div className="col">
              <Field
                id="tag"
                name="tag"
                placeholder="Tag"
                type="text"
                className="form-control form-control-sm"
                autoComplete="off"
                onBlur={handleSubmit}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeTagForm;

interface MyFormValues {
  tag: string;
}
interface PropsType {
  tag: string | null;
  handleSubmit: (tag: string) => void;
}
