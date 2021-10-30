import cn from 'classnames';
import { endOfToday, getTime } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  checkTask,
  deleteTask,
  getTasks,
  Task,
  uncheckTask,
  updateTask,
} from '../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../Redux/store';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './CheckListPage.module.scss';
import DoneTaskComponent from './DoneTaskComponent/DoneTaskComponent';
import TaskComponent from './TaskComponent/TaskComponent';

const CheckListPage = () => {
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );
  const tasks = useSelector((state: AppStateType) => state.tasks.tasksList);
  const undoneTasks = tasks.filter(
    (i) => !i.data.done && i.data.time <= getTime(endOfToday())
  );
  const doneTasks = useSelector(
    (state: AppStateType) => state.tasks.doneTasksList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const newTaskSubmit = (task: string) => {
    let time = new Date().getTime();
    dispatch(addTask(task, time));
  };
  const taskComponentCheckHandler = (task: Task) => {
    dispatch(checkTask(task));
  };
  const taskComponentUncheckHandler = (id: string) => {
    dispatch(uncheckTask(id));
  };
  const taskComponentRepeatHandler = (id: string) => {
    dispatch(updateTask(id, { repeat: 1 }));
  };
  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  const mapTaskComponent = (task: Task) => (
    <TaskComponent
      task={task}
      key={task.id}
      checkHandler={taskComponentCheckHandler}
      repeatHandler={taskComponentRepeatHandler}
      deleteHandler={taskComponentDeleteHandler}
    />
  );
  const mapDoneTaskComponent = ([id, name]: string[]) => (
    <DoneTaskComponent
      id={id}
      key={id}
      name={name}
      uncheckHandler={taskComponentUncheckHandler}
    />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={'my-4'}>
          <NewTaskForm handleSubmit={newTaskSubmit} />
        </div>
        {initTasksStatus ? (
          <>
            <span>Задачи</span>
            {undoneTasks.length ? (
              undoneTasks.map(mapTaskComponent)
            ) : (
              <span className={styles['taskList__comment']}>
                Нет новых задач
              </span>
            )}
            <span>Выполнено</span>
            {Object.keys(doneTasks).length ? (
              Object.entries(doneTasks).map(mapDoneTaskComponent)
            ) : (
              <span className={styles['taskList__comment']}>
                Задачи не выполнены
              </span>
            )}
          </>
        ) : (
          <div className={cn('spinner-border ', styles.spinner)} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckListPage;
