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
        <section className={styles['tomorrow-tasks']}>
          <div className={'my-4'}>
            <NewTaskForm handleSubmit={newTaskSubmit} />
          </div>
          {initTasksStatus ? (
            <>
              <h2 className="mb-3">???????????? ???? ????????????</h2>
              <TaskMapComponent
                list={tomorrowTasks}
                stub={'?????? ?????????? ??????????'}
                callback={mapTomorrowTask}
              />
            </>
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </section>
        <section className={styles['completed-tasks']}>
          {initTasksStatus ? (
            <>
              <h2 className="mb-3">???????????????????? ????????????</h2>
              <TaskMapComponent
                list={completedTasks}
                stub={'?????? ???????????????????? ??????????'}
                callback={mapCompletedTask}
              />
            </>
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </section>
      </div>
    </div>
  );
};

export default TomorrowListPage;
