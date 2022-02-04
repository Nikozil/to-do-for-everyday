import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent } from 'react';
import { toUpperCase } from '../../../utils/FormFunctions/FormFunctions';
import styles from './NewTaskForm.module.scss';

const NewTaskForm: React.FC<PropsType> = ({
  handleSubmit,
  setFocus,
  setFilter,
  isMounted,
}) => {
  const initialValues: MyFormValues = {
    newTask: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values.newTask);
        setFocus(false);
        resetForm();
      }}>
      {({ setFieldValue, handleSubmit, values }) => {
        const HandleInput = (e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          setFieldValue('newTask', toUpperCase(value));
          setFilter(values.newTask);
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
                onFocus={() => setFocus(true)}
                onBlur={() =>
                  setTimeout(() => {
                    if (isMounted) setFocus(false);
                  }, 300)
                }
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
  setFocus: (focus: boolean) => void;
  setFilter: (filter: string) => void;
  isMounted: boolean;
}
