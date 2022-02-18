import cn from 'classnames';
import React, { ChangeEventHandler, useState } from 'react';
import { Priority } from '../../../Redux/modules/tasksSlice';
import { convertPriorityValue } from '../../../utils/RangeFunctions/RangeFunctions';
import styles from './PriorityRange.module.scss';

const PriorityRange: React.FC<Props> = ({ priority, changeHandler }) => {
  const initialValue = convertPriorityValue(priority) as number;
  const [value, setValue] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(+e.target.value);
  };

  const selectHandler = () => {
    const newPriority = convertPriorityValue(value);
    changeHandler(newPriority);
  };
  const expressThumbStyle = value === 0 && styles['range__input_express'];
  const expressLabelStyle = value === 0 && styles['range__express_checked'];

  const regularThumbStyle = value === 1 && styles['range__input_regular'];
  const regularLabelStyle = value === 1 && styles['range__regular_checked'];

  const importantThumbStyle = value === 2 && styles['range__input_important'];
  const importantLabelStyle = value === 2 && styles['range__important_checked'];

  return (
    <div className={styles['range']}>
      <label className={styles['range__label']}>Приоритет</label>

      <div className={cn(styles['range__express'], expressLabelStyle)}>
        Срочное
      </div>
      <div className={cn(styles['range__regular'], regularLabelStyle)}>
        Обычное
      </div>
      <div className={cn(styles['range__important'], importantLabelStyle)}>
        Важное
      </div>

      <input
        type="range"
        className={cn(
          styles['range__input'],
          expressThumbStyle,
          regularThumbStyle,
          importantThumbStyle
        )}
        min="0"
        max="2"
        step="1"
        value={value}
        onChange={onChange}
        onMouseUp={selectHandler}
        onTouchEnd={selectHandler}
      />
    </div>
  );
};

export default PriorityRange;

interface Props {
  priority: Priority | undefined;
  changeHandler: any;
}
