import cn from 'classnames';
import React from 'react';
import { ImCheckboxUnchecked, ImCross } from 'react-icons/im';
import { RiPushpinFill, RiPushpinLine } from 'react-icons/ri';
import { PartialTaskData, Task } from '../../../../../Redux/modules/tasksSlice';
import styles from './TaskComponent.module.scss';

const TaskComponent: React.FC<PropsType> = ({
  task,
  checkHandler,
  repeatHandler,
  deleteHandler,
}) => {
  const { id, data } = task;
  const { name, repeat } = data;

  const clickCheckHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    checkHandler(task);
  };
  const clickRepeatHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    repeatHandler(id, { repeat: repeat ? 0 : 1 });
  };
  const clickDeleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteHandler(id);
  };

  return (
    <li className={styles.content}>
      <span className={styles.task}>
        <button
          aria-label={'delete task'}
          name={'delete task'}
          onClick={clickDeleteHandler}
          className={styles.button}
          data-testid="delete-button">
          <ImCross />
        </button>
        <span className={styles.taskName}>{name}</span>
      </span>

      <span className={styles.buttons}>
        <button
          aria-label={'repeat task'}
          name={'repeat task'}
          onClick={clickRepeatHandler}
          className={styles.button}
          data-testid="repeat-button">
          {repeat ? <RiPushpinFill /> : <RiPushpinLine />}
        </button>
        <button
          aria-label={'task check'}
          name={'task check'}
          onClick={clickCheckHandler}
          className={cn(styles.button, styles['buttons-margin'])}
          data-testid="check-button">
          <ImCheckboxUnchecked />
        </button>
      </span>
    </li>
  );
};

export default TaskComponent;

interface PropsType {
  task: Task;
  checkHandler: (task: Task) => void;
  repeatHandler: (id: string, data: PartialTaskData) => void;
  deleteHandler: (id: string) => void;
}
