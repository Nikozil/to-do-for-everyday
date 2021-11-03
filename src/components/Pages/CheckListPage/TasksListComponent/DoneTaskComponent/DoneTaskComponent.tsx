import React from 'react';
import { ImCheckboxChecked } from 'react-icons/im';
import { LivedTask } from '../../../../../Redux/modules/tasksSlice';
import styles from './DoneTaskComponent.module.scss';

const DoneTaskComponent: React.FC<PropsType> = ({ task, uncheckHandler }) => {
  const { name } = task;
  const clickUncheckHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    uncheckHandler(task);
  };

  return (
    <div className={styles.content}>
      <span className={styles.task}>
        <span className={styles.taskName}>{name}</span>
      </span>
      <button
        name={'task done'}
        onClick={clickUncheckHandler}
        className={styles.button}
        data-testid="uncheck-button">
        <ImCheckboxChecked />
      </button>
    </div>
  );
};

export default DoneTaskComponent;

interface PropsType {
  task: LivedTask;
  uncheckHandler: (task: LivedTask) => void;
}
