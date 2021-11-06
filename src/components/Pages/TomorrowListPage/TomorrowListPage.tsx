import { endOfToday, getTime } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import {
  addTask,
  deleteTask,
  PartialTaskData,
  Task,
  updateTask,
} from '../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../Redux/store';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './TomorrowListPage.module.scss';
import TaskComponent from '../../../assets/TaskComponent/TaskComponent';
import { DeleteButton, RepeatButton } from '../../../assets/Buttons/Buttons';

const TomorrowListPage = () => {
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );

  const tasks = useSelector((state: AppStateType) => state.tasks.tasksList);
  const tomorrowTasks = tasks.filter(
    (i) => !i.data.done && i.data.time > getTime(endOfToday())
  );

  const dispatch = useDispatch();

  const newTaskSubmit = (task: string) => {
    dispatch(addTask(task, { days: 1 }));
  };

  const taskComponentRepeatHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
  };
  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  const mapTaskComponent = (task: Task) => (
    <TaskComponent key={task.id}>
      <span className={styles.task}>
        <DeleteButton task={task} clickHandler={taskComponentDeleteHandler} />
        <span className={styles.taskName}>{task.data.name}</span>
      </span>
      <RepeatButton task={task} clickHandler={taskComponentRepeatHandler} />
    </TaskComponent>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={'my-4'}>
          <NewTaskForm handleSubmit={newTaskSubmit} />
        </div>
        {initTasksStatus ? (
          <>
            <span>Задачи на завтра</span>
            <ul className={styles.list}>
              {tomorrowTasks.length ? (
                tomorrowTasks.map(mapTaskComponent)
              ) : (
                <span className={styles['taskList__comment']}>
                  Нет новых задач
                </span>
              )}
            </ul>
          </>
        ) : (
          <SpinComponent styleClass={styles.spinner} />
        )}
      </div>
    </div>
  );
};

export default TomorrowListPage;
