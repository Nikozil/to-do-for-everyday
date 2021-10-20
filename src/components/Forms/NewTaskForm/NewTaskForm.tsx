import React from 'react';
import { Field, Form, Formik } from 'formik';

const NewTaskForm: React.FC<PropsType> = ({ handleSubmit }) => {
  const initialValues: MyFormValues = {
    newTask: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus, resetForm }) => {
        await handleSubmit(values.newTask);
        resetForm();
      }}>
      {({ errors, touched, isValidating, status }) => (
        <Form>
          <div className="mb-1">
            <Field
              id="newTask"
              name="newTask"
              placeholder="Новая Задача"
              type="text"
              className="form-control"
              autoComplete="off"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewTaskForm;

interface MyFormValues {
  newTask: string;
}
interface PropsType {
  handleSubmit: (newTask: string) => void;
}
