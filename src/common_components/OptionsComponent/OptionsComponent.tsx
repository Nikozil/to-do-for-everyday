import cn from 'classnames';
import { getTime } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Task, updateTask } from '../../Redux/modules/tasksSlice';
import Calendar from '../Calendar/Calendar';
import styles from './OptionsComponent.module.scss';

const OptionsComponent: React.FC<PropsType> = ({ task }) => {
  const dispatch = useDispatch();

  const { id } = task;
  const { time } = task.data;

  const date = new Date(time);

  const setDateHandler = (date: Date) => {
    const time = getTime(date);

    dispatch(updateTask(id, { time }));
  };

  return (
    <div className={cn(styles.options, styles['options_border'])}>
      <div className={styles.calendar}>
        <Calendar date={date} setDate={setDateHandler} />
      </div>
    </div>
  );
};

export default OptionsComponent;

interface PropsType {
  task: Task;
}
