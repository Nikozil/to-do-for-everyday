import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  updateTask,
  getTasks,
  deleteTask,
  Task,
  PartialTaskData,
} from '../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../Redux/store';
import TaskComponent from './TaskComponent/TaskComponent';
import styles from './CheckListPage.module.scss';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import cn from 'classnames';

const CheckListPage = () => {
  const tasks = useSelector((state: AppStateType) => state.tasks.tasksList);
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const newTaskSubmit = (task: string) => {
    dispatch(addTask(task));
  };
  const taskComponentCheckHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
  };
  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };
  const mapTaskComponent = (i: Task) => (
    <TaskComponent
      id={i.id}
      key={i.id}
      name={i.data.name}
      done={i.data.done}
      checkHandler={taskComponentCheckHandler}
      deleteHandler={taskComponentDeleteHandler}
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
            {tasks.filter((i) => !i.data.done).map(mapTaskComponent)}
            <span>Выполнено</span>
            {tasks.filter((i) => i.data.done).map(mapTaskComponent)}
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
