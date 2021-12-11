import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteButton,
  DoItAgainButton,
  RepeatButton,
} from '../../../assets/Buttons/Buttons';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import TaskComponent from '../../../assets/TaskComponent/TaskComponent';
import TaskMapComponent from '../../../assets/TaskMapComponent/TaskMapComponent';
import {
  addTask,
  deleteTask,
  doAgainTask,
  PartialTaskData,
  Task,
  updateTask,
} from '../../../Redux/modules/tasksSlice';
import {
  selectCompletedTasks,
  selectInitTasksStatus,
  selectTomorrowTasks,
} from '../../../Redux/selectors/tasksSelector';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './TomorrowListPage.module.scss';

const TomorrowListPage = () => {
  const dispatch = useDispatch();

  const initTasksStatus = useSelector(selectInitTasksStatus);

  const tomorrowTasks = useSelector(selectTomorrowTasks);

  const completedTasks = useSelector(selectCompletedTasks);

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
        <span className={styles['task__task-name']}>{task.data.name}</span>
      </span>
      <RepeatButton task={task} clickHandler={taskComponentRepeatHandler} />
    </TaskComponent>
  );
  const mapCompletedTask = (task: Task) => (
    <TaskComponent key={task.id} border={true}>
      <span className={styles.task}>
        <DeleteButton task={task} clickHandler={taskComponentDeleteHandler} />
        <span className={styles['task__task-name']}>{task.data.name}</span>
      </span>
      <DoItAgainButton task={task} clickHandler={taskComponentAgainHandler} />
    </TaskComponent>
  );

  return (
    <div className={styles['tomorrow-page']}>
      <div className={styles['tomorrow-page__content']}>
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
