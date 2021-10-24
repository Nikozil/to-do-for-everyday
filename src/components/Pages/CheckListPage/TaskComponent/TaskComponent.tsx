import React from 'react';
import styles from './TaskComponent.module.scss';
import {
  ImCheckboxUnchecked,
  ImCheckboxChecked,
  ImCross,
} from 'react-icons/im';
import { PartialTaskData } from '../../../../Redux/modules/tasksSlice';

const TaskComponent: React.FC<PropsType> = ({
  id,
  name,
  done,
  checkHandler,
  deleteHandler,
}) => {
  const clickCheckHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    checkHandler(id, { done: !done });
  };
  const clickDeleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteHandler(id);
  };
  return (
    <div className={styles.content}>
      <span className={styles.task}>
        <button
          name={'delete task'}
          onClick={clickDeleteHandler}
          className={styles.doneToggle}
          data-testid="delete-button">
          <ImCross />
        </button>
        <span className={styles.taskName}>{name}</span>
      </span>
      <button
        name={'task done'}
        onClick={clickCheckHandler}
        className={styles.doneToggle}
        data-testid="check-button">
        {done ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
      </button>
    </div>
  );
};

export default TaskComponent;

interface PropsType {
  id: string;
  name: string;
  done: boolean;
  checkHandler: (id: string, data: PartialTaskData) => void;
  deleteHandler: (id: string) => void;
}
