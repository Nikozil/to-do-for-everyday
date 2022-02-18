import React, { ChangeEventHandler, useState } from 'react';
import cn from 'classnames';
import styles from './RangeForm.module.scss';

const RangeForm: React.FC<Props> = ({
  initValue,
  changeHandler,
  min,
  max,
  step,
  name,
  label,
  measure = '',
  className = '',
}) => {
  const [value, setValue] = useState(initValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(+e.target.value);
  };

  const selectHandler = () => {
    changeHandler(value);
  };

  return (
    <div className={styles['range']}>
      <label htmlFor={name} className={styles['range__label']}>
        {label} <div className={styles['range__value']}>{value}</div> {measure}
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onMouseUp={selectHandler}
        onTouchEnd={selectHandler}
        onChange={onChange}
        className={cn(styles['range__input'], className)}
      />
    </div>
  );
};

export default RangeForm;

interface Props {
  initValue: number;
  changeHandler: (initValue: number) => void;
  min: number;
  max: number;
  step: number;
  name: string;
  label: string;
  measure?: string;
  className?: string;
}
