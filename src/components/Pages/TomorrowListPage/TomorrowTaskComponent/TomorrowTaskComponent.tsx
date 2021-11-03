import React from 'react';
import { ImCross } from 'react-icons/im';
import { RiPushpinFill, RiPushpinLine } from 'react-icons/ri';
import { PartialTaskData, Task } from '../../../../Redux/modules/tasksSlice';
import styles from './TomorrowTaskComponent.module.scss';

const TomorrowTaskComponent: React.FC<PropsType> = ({
  task,
  repeatHandler,
  deleteHandler,
}) => {
  const { id, data } = task;
  const { name, repeat } = data;
  const clickRepeatHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    repeatHandler(id, { repeat: repeat ? 0 : 1 });
  };
  const clickDeleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteHandler(id);
  };

  return (
    <div className={styles.content}>
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
      <button
        aria-label={'repeat task'}
        onClick={clickRepeatHandler}
        className={styles.button}
        data-testid="repeat-button">
        {repeat ? <RiPushpinFill /> : <RiPushpinLine />}
      </button>
    </div>
  );
};

export default TomorrowTaskComponent;

interface PropsType {
  task: Task;
  repeatHandler: (id: string, data: PartialTaskData) => void;
  deleteHandler: (id: string) => void;
}
