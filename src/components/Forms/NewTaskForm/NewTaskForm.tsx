import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent } from 'react';
import { toUpperCase } from '../../../utils/FormFunctions/FormFunctions';
import styles from './NewTaskForm.module.scss';

const NewTaskForm: React.FC<PropsType> = ({ handleSubmit }) => {
  const initialValues: MyFormValues = {
    newTask: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values.newTask);
        resetForm();
      }}>
      {({ setFieldValue }) => {
        const HandleInput = (e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          setFieldValue('newTask', toUpperCase(value));
        };
        return (
          <Form>
            <div className="mb-1">
              <Field
                id="newTask"
                name="newTask"
                placeholder="Новая Задача"
                type="text"
                className={cn('form-control', styles.newTask)}
                autoComplete="off"
                onKeyUp={HandleInput}
              />
            </div>
          </Form>
        );
      }}
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
