import React from 'react';
import RangeForm from '../../../components/Forms/RangeForm/RangeForm';
import styles from './RepeatRange.module.scss';

const RepeatRange: React.FC<Props> = ({ repeat, changeHandler }) => {
  return (
    <div className={styles['wrapper']}>
      <RangeForm
        changeHandler={changeHandler}
        initValue={repeat}
        label={'Повтор'}
        measure={'д.'}
        name={'repeat'}
        min={0}
        max={7}
        step={1}
      />
    </div>
  );
};

export default RepeatRange;

interface Props {
  repeat: number;
  changeHandler: (repeat: number) => void;
}
