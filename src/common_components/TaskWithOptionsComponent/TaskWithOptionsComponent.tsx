import React from 'react';
import { useDispatch } from 'react-redux';
import { checkTask, Task } from '../../Redux/modules/tasksSlice';
import { CheckButton, OptionsButton } from '../Buttons/Buttons';
import OptionsComponent from '../OptionsComponent/OptionsComponent';
import TaskComponent from '../TaskComponent/TaskComponent';
import TaskIndicator from '../TaskIndicator/TaskIndicator';
import {
  CurrentOptions,
  SetCurrentOptions,
} from '../TaskMapComponent/TaskMapComponent';
import styles from './TaskWithOptionsComponent.module.scss';

const TaskWithOptionsComponent: React.FC<PropsType> = ({
  task,
  currentOptions,
  setCurrentOptions,
}) => {
  const dispatch = useDispatch();

  const optionsHandler = () => {
    setCurrentOptions((prev: CurrentOptions) =>
      prev === task.id ? null : task.id
    );
  };

  const taskComponentCheckHandler = () => {
    dispatch(checkTask(task));
  };

  const showOptions = currentOptions === task.id;
  return (
    <>
      <TaskComponent border={true}>
        <span className={styles.task}>
          <TaskIndicator task={task} />
          <span className={styles['task__taskName']}>{task.data.name}</span>
        </span>
        <span className={styles['task__buttons']}>
          <OptionsButton clickHandler={optionsHandler} />
          <CheckButton
            clickHandler={taskComponentCheckHandler}
            className={styles['task__buttons_left-margin']}
          />
        </span>
      </TaskComponent>
      {showOptions && <OptionsComponent task={task} />}
    </>
  );
};

export default TaskWithOptionsComponent;

interface PropsType {
  task: Task;
  currentOptions: CurrentOptions;
  setCurrentOptions: SetCurrentOptions;
}
