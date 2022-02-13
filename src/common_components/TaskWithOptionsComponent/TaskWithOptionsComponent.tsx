import React from 'react';
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

  const taskComponentCheckHandler = (task: Task) => {
    dispatch(checkTask(task));
  };

  const taskComponentRepeatHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
  };

  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  const showOptions = currentOptions === task.id;
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
