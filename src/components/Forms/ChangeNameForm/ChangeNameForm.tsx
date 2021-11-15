import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent } from 'react';
import { toUpperCase } from '../../../utils/FormFunctions/FormFunctions';
const ChangeNameForm: React.FC<PropsType> = ({ displayName, handleSubmit }) => {
  const initialValues: MyFormValues = {
    displayName: displayName || '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleSubmit(values.displayName);
      }}>
      {({ setFieldValue }) => {
        const HandleInput = (e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          setFieldValue('displayName', toUpperCase(value));
        };
        return (
          <Form>
            <div className="mb-1">
              <label htmlFor="displayName" className={'form-label'}>
                Имя
              </label>
              <Field
                id="displayName"
                name="displayName"
                placeholder="Имя"
                type="text"
                className="form-control"
                onKeyUp={HandleInput}
              />
            </div>

            <div className={'text-center my-2'}>
              <button type="submit" className={'btn btn-success center-block'}>
                Изменить
              </button>
            </div>
          </Form>
        );
      }}
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
