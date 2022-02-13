import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  checkTask,
  deleteTask,
  PartialTaskData,
  Task,
  updateTask,
} from '../../Redux/modules/tasksSlice';
import {
  CheckButton,
  DeleteButton,
  OptionsButton,
  RepeatButton,
} from '../Buttons/Buttons';
import OptionsComponent from '../OptionsComponent/OptionsComponent';
import TaskComponent from '../TaskComponent/TaskComponent';
import styles from './TaskWithOptionsComponent.module.scss';

const TaskWithOptionsComponent: React.FC<PropsType> = ({ task }) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState(false);

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  const taskComponentCheckHandler = (task: Task) => {
    dispatch(checkTask(task));
  };

  const taskComponentRepeatHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
  };

  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };
  return (
    <>
      <TaskComponent border={true}>
        <span className={styles.task}>
          <DeleteButton task={task} clickHandler={taskComponentDeleteHandler} />
          <span className={styles['task__taskName']}>{task.data.name}</span>
        </span>
        <span className={styles['task__buttons']}>
          <RepeatButton task={task} clickHandler={taskComponentRepeatHandler} />
          <OptionsButton clickHandler={optionsHandler} />
          <CheckButton
            task={task}
            clickHandler={taskComponentCheckHandler}
            className={styles['task__buttons_left-margin']}
          />
        </span>
      </TaskComponent>
      {options ? <OptionsComponent task={task} /> : null}
    </>
  );
};

export default TaskWithOptionsComponent;

interface PropsType {
  task: Task;
}
