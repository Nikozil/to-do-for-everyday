import React, { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import cn from 'classnames';
import styles from './ChangeTagForm.module.scss';
import {
  autoHeight,
  toUpperCase,
} from '../../../utils/FormFunctions/FormFunctions';
const ChangeTagForm: React.FC<PropsType> = ({ tag, handleSubmit }) => {
  const initialValues: MyFormValues = {
    tag: tag || '',
  };

  const formikRef = useRef<HTMLElement>();
  useEffect(() => {
    autoHeight(formikRef.current);
  }, [formikRef]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleSubmit(values.tag);
      }}>
      {({ handleSubmit, setFieldValue }) => {
        const handleInput = (
          event: KeyboardEvent & { target: HTMLInputElement }
        ) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }

          autoHeight(event.target);

          const { value } = event.target;
          setFieldValue('tag', toUpperCase(value));
        };

        return (
          <Form>
            <div className="row g-2 align-items-center">
              <div className="col-auto">
                <label htmlFor="tag" className="col-form-label-sm fw-bold">
                  #Tag дня:
                </label>
              </div>
              <div className="col">
                <Field
                  as="textarea"
                  rows="1"
                  id="tag"
                  name="tag"
                  placeholder="Tag"
                  type="text"
                  className={cn(
                    'form-control',
                    'form-control-sm',
                    styles.textarea
                  )}
                  autoComplete="off"
                  onBlur={handleSubmit}
                  onKeyDown={handleInput}
                  innerRef={formikRef}
                />
              </div>
            </div>
          </Form>
        );
      }}
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
