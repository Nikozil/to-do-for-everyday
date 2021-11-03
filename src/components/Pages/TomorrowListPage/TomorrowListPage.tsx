import cn from 'classnames';
import { add, endOfToday, getTime } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  deleteTask,
  getTasks,
  PartialTaskData,
  Task,
  updateTask,
} from '../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../Redux/store';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './TomorrowListPage.module.scss';
import TomorrowTaskComponent from './TomorrowTaskComponent/TomorrowTaskComponent';

const TomorrowListPage = () => {
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );
  const time = useSelector((state: AppStateType) => state.clock.time);

  const tasks = useSelector((state: AppStateType) => state.tasks.tasksList);
  const tomorrowTasks = tasks.filter(
    (i) => !i.data.done && i.data.time > getTime(endOfToday())
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const newTaskSubmit = (task: string) => {
    let tomorrowTime = getTime(add(time, { days: 1 }));
    dispatch(addTask(task, tomorrowTime));
  };

  const taskComponentRepeatHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
  };
  const taskComponentDeleteHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  const mapTaskComponent = (task: Task) => (
    <TomorrowTaskComponent
      task={task}
      key={task.id}
      repeatHandler={taskComponentRepeatHandler}
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
            <span>Задачи на завтра</span>
            {tomorrowTasks.length ? (
              tomorrowTasks.map(mapTaskComponent)
            ) : (
              <span className={styles['taskList__comment']}>
                Нет новых задач
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

export default TomorrowListPage;
