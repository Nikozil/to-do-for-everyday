import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import RaitingStarComponent from '../../../common_components/RaitingStarComponent/RaitingStarComponent';
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
        console.log(123);

        await handleSubmit(values.score);
      }}>
      {({ handleSubmit }) => (
        <Form>
          <div className="row g-2 align-items-center">
            <div className="col-auto">
              <div id="my-radio-group" className="col-form-label-sm fw-bold">
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
                      className={styles['star']}
                      onMouseEnter={() => setHover(scoreValue)}
                      onMouseLeave={() => setHover(0)}>
                      <Field
                        type="radio"
                        name="score"
                        value={`${scoreValue}`}
                        className={styles['star__radio']}
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
