import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endOfToday, getTime } from 'date-fns';
import { createSelector } from 'reselect';

import {
  addTask,
  deleteTask,
  doAgainTask,
  PartialTaskData,
  Task,
  updateTask,
} from '../../../Redux/modules/tasksSlice';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import TaskComponent from '../../../assets/TaskComponent/TaskComponent';
import {
  DeleteButton,
  DoItAgainButton,
  RepeatButton,
} from '../../../assets/Buttons/Buttons';
import { AppStateType } from '../../../Redux/store';
import styles from './TomorrowListPage.module.scss';
import TaskMapComponent from '../../../assets/TaskMapComponent/TaskMapComponent';

const TomorrowListPage = () => {
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );
  const tomorrowTasksSelector = createSelector(
    (state: AppStateType) => state.tasks.tasksList,
    (tasks) =>
      tasks.filter((i) => !i.data.done && i.data.time > getTime(endOfToday()))
  );
  const completedTasksSelector = createSelector(
    (state: AppStateType) => state.tasks.tasksList,
    (tasks) => tasks.filter((i) => i.data.done)
  );
  const tomorrowTasks = useSelector(tomorrowTasksSelector);
  const completedTasks = useSelector(completedTasksSelector);

  const dispatch = useDispatch();

  const newTaskSubmit = (task: string) => {
    dispatch(addTask(task, { days: 1 }));
  };

  const taskComponentRepeatHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
  };
  const taskComponentAgainHandler = (task: Task) => {
    dispatch(doAgainTask(task));
  };
  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  const mapTomorrowTask = (task: Task) => (
    <TaskComponent key={task.id} border={true}>
      <span className={styles.task}>
        <DeleteButton task={task} clickHandler={taskComponentDeleteHandler} />
        <span className={styles.taskName}>{task.data.name}</span>
      </span>
      <RepeatButton task={task} clickHandler={taskComponentRepeatHandler} />
    </TaskComponent>
  );
  const mapCompletedTask = (task: Task) => (
    <TaskComponent key={task.id} border={true}>
      <span className={styles.task}>
        <DeleteButton task={task} clickHandler={taskComponentDeleteHandler} />
        <span className={styles.taskName}>{task.data.name}</span>
      </span>
      <DoItAgainButton task={task} clickHandler={taskComponentAgainHandler} />
    </TaskComponent>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles['tomorrow-tasks']}>
          <div className={'my-4'}>
            <NewTaskForm handleSubmit={newTaskSubmit} />
          </div>
          {initTasksStatus ? (
            <>
              <div className="mb-3">Задачи на завтра</div>
              <TaskMapComponent
                list={tomorrowTasks}
                stub={'Нет новых задач'}
                callback={mapTomorrowTask}
              />
            </>
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </div>
        <div className={styles['completed-tasks']}>
          {initTasksStatus ? (
            <>
              <div className="mb-3">Выполненые задачи</div>
              <TaskMapComponent
                list={completedTasks}
                stub={'Нет выполненых задач'}
                callback={mapCompletedTask}
              />
            </>
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TomorrowListPage;
