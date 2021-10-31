import React from 'react';
import { ImCross, ImStarEmpty, ImStarFull } from 'react-icons/im';
import { Task } from '../../../../Redux/modules/tasksSlice';
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
    repeatHandler(id);
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
          className={styles.button}
          data-testid="delete-button">
          <ImCross />
        </button>
        <span className={styles.taskName}>{name}</span>
      </span>
      <button
        name={'repeat'}
        onClick={clickRepeatHandler}
        className={styles.button}
        data-testid="repeat-button">
        {repeat ? <ImStarFull /> : <ImStarEmpty />}
      </button>
    </div>
  );
};

export default TomorrowTaskComponent;

interface PropsType {
  task: Task;
  repeatHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
}
