import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UncheckButton } from '../../../../common_components/Buttons/Buttons';
import TaskComponent from '../../../../common_components/TaskComponent/TaskComponent';
import TaskMapComponent, {
  CurrentOptions,
  SetCurrentOptions,
} from '../../../../common_components/TaskMapComponent/TaskMapComponent';
import TaskWithOptionsComponent from '../../../../common_components/TaskWithOptionsComponent/TaskWithOptionsComponent';
import {
  LivedTask,
  Task,
  uncheckTask,
} from '../../../../Redux/modules/tasksSlice';
import {
  selectCurrentTasks,
  selectDoneTasks,
} from '../../../../Redux/selectors/tasksSelector';
import styles from './TasksListComponent.module.scss';

const TasksListComponent = () => {
  const dispatch = useDispatch();

  const currentTasks = useSelector(selectCurrentTasks);

  const doneTasks = useSelector(selectDoneTasks);

  const mapTaskComponent = (
    task: Task,
    currentOptions: CurrentOptions,
    setCurrentOptions: SetCurrentOptions
  ) => (
    <TaskWithOptionsComponent
      task={task}
      currentOptions={currentOptions}
      setCurrentOptions={setCurrentOptions}
    />
  );

  const mapDoneTaskComponent = (task: LivedTask) => {
    const taskComponentUncheckHandler = () => {
      dispatch(uncheckTask(task));
    };

    return (
      <TaskComponent key={task.id} border={true}>
        <span className={styles.task}>
          <span className={styles['task__doneTaskName']}>{task.name}</span>
        </span>
        <span className={styles['task__buttons']}>
          <UncheckButton clickHandler={taskComponentUncheckHandler} />
        </span>
      </TaskComponent>
    );
  };

  return (
    <>
      <h2 className="mb-3">Задачи</h2>
      <TaskMapComponent
        list={currentTasks}
        stub={'Нет новых задач'}
        callback={mapTaskComponent}
      />

      <h2 className="mb-3">Выполнено</h2>
      <TaskMapComponent
        list={doneTasks}
        stub={'Список пуст'}
        callback={mapDoneTaskComponent}
      />
    </>
  );
};

export default TasksListComponent;
