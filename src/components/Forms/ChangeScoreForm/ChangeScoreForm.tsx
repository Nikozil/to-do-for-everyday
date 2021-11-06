import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import RaitingStarComponent from '../../../assets/RaitingStarComponent/RaitingStarComponent';
import styles from './ChangeScoreForm.module.scss';

const ChangeScoreForm: React.FC<PropsType> = ({ score, handleSubmit }) => {
  const initialValues: MyFormValues = {
    score: score || 0,
  };
  const [hover, setHover] = useState<number>(0);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await handleSubmit(values.score);
      }}>
      {({ errors, touched, isValidating, status, handleSubmit }) => (
        <Form>
          <div className="row g-2 align-items-center">
            <div className="col-auto">
              <div id="my-radio-group" className="col-form-label-sm">
                Оченка дня
              </div>
            </div>
            <div className="col-auto">
              <div role="group" aria-labelledby="my-radio-group">
                {[...Array(5)].map((star, index) => {
                  let scoreValue = index + 1;
                  return (
                    <label
                      key={scoreValue}
                      className={styles.label}
                      onMouseEnter={() => setHover(scoreValue)}
                      onMouseLeave={() => setHover(0)}>
                      <Field
                        type="radio"
                        name="score"
                        value={`${scoreValue}`}
                        className={styles.radio}
                        onClick={handleSubmit}
                      />
                      <RaitingStarComponent
                        active={(hover || score) >= scoreValue}
                        size={29}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeScoreForm;

interface MyFormValues {
  score: Score;
}
interface PropsType {
  score: Score;
  handleSubmit: (score: Score) => void;
}
type Score = 0 | 1 | 2 | 3 | 4 | 5;
