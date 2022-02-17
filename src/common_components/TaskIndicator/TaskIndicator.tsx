import cn from 'classnames';
import React from 'react';
import { CgRepeat } from 'react-icons/cg';
import { Task } from '../../Redux/modules/tasksSlice';
import styles from './TaskIndicator.module.scss';

const TaskIndicator: React.FC<PropsType> = ({ task }) => {
  const { priority, repeat } = task.data;

  const expressStyle =
    priority === 'express' && styles['indicator__priority_express'];

  const regularStyle =
    (priority === undefined || priority === 'regular') &&
    styles['indicator__priority_regular'];

  const importantStyle =
    priority === 'important' && styles['indicator__priority_important'];

  return (
    <div className={styles['indicator']}>
      <div
        className={cn(
          styles['indicator__priority'],
          expressStyle,
          regularStyle,
          importantStyle
        )}></div>

      <div className={styles['indicator__repeat']}>
        {repeat ? (
          <>
            <CgRepeat />
            <div className={styles['indicator__repeat-value']}>{repeat}</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TaskIndicator;

interface PropsType {
  task: Task;
}
