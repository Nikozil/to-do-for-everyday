import { endOfToday, getTime } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkTask,
  deleteTask,
  LivedTask,
  PartialTaskData,
  Task,
  uncheckTask,
  updateTask,
} from '../../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../../Redux/store';
import DoneTaskComponent from './DoneTaskComponent/DoneTaskComponent';
import TaskComponent from './TaskComponent/TaskComponent';
import styles from './TasksListComponent.module.scss';

const TasksListComponent = () => {
  const tasks = useSelector((state: AppStateType) => state.tasks.tasksList);
  const undoneTasks = tasks.filter(
    (i) => !i.data.done && i.data.time <= getTime(endOfToday())
  );
  const doneTasks = useSelector(
    (state: AppStateType) => state.tasks.livedDay.doneTasksList
  );

  const dispatch = useDispatch();

  const taskComponentCheckHandler = (task: Task) => {
    dispatch(checkTask(task));
  };
  const taskComponentUncheckHandler = (task: LivedTask) => {
    dispatch(uncheckTask(task));
  };
  const taskComponentRepeatHandler = (id: string, data: PartialTaskData) => {
    dispatch(updateTask(id, data));
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
  const mapDoneTaskComponent = (task: LivedTask) => (
    <DoneTaskComponent
      task={task}
      key={task.id}
      uncheckHandler={taskComponentUncheckHandler}
    />
  );

  return (
    <>
      <span>Задачи</span>
      <ul className={styles.list}>
        {undoneTasks.length ? (
          undoneTasks.map(mapTaskComponent)
        ) : (
          <span className={styles['taskList__comment']}>Нет новых задач</span>
        )}
      </ul>

      <span>Выполнено</span>
      <ul className={styles.list}>
        {doneTasks.length ? (
          doneTasks.map(mapDoneTaskComponent)
        ) : (
          <span className={styles['taskList__comment']}>
            Задачи не выполнены
          </span>
        )}
      </ul>
    </>
  );
};

export default TasksListComponent;
