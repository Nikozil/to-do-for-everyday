import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endOfToday, getTime } from 'date-fns';

import {
  checkTask,
  deleteTask,
  LivedTask,
  PartialTaskData,
  Task,
  uncheckTask,
  updateTask,
} from '../../../../Redux/modules/tasksSlice';

import TaskComponent from '../../../../assets/TaskComponent/TaskComponent';
import TaskMapComponent from '../../../../assets/TaskMapComponent/TaskMapComponent';
import {
  CheckButton,
  DeleteButton,
  RepeatButton,
  UncheckButton,
} from '../../../../assets/Buttons/Buttons';
import styles from './TasksListComponent.module.scss';
import { AppStateType } from '../../../../Redux/store';

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
    <TaskComponent border={true}>
      <span className={styles.task}>
        <DeleteButton task={task} clickHandler={taskComponentDeleteHandler} />
        <span className={styles.taskName}>{task.data.name}</span>
      </span>
      <span className={styles.buttons}>
        <RepeatButton task={task} clickHandler={taskComponentRepeatHandler} />
        <CheckButton
          task={task}
          clickHandler={taskComponentCheckHandler}
          className={styles['buttons-margin']}
        />
      </span>
    </TaskComponent>
  );
  const mapDoneTaskComponent = (task: LivedTask) => (
    <TaskComponent key={task.id} border={true}>
      <span className={styles.task}>
        <span className={styles.doneTaskName}>{task.name}</span>
      </span>
      <span className={styles.buttons}>
        <UncheckButton task={task} clickHandler={taskComponentUncheckHandler} />
      </span>
    </TaskComponent>
  );

  return (
    <>
      <div className="mb-3">Задачи</div>
      <TaskMapComponent
        list={undoneTasks}
        stub={'Нет новых задач'}
        callback={mapTaskComponent}
      />

      <div className="mb-3">Выполнено</div>
      <TaskMapComponent
        list={doneTasks}
        stub={'Список пуст'}
        callback={mapDoneTaskComponent}
      />
    </>
  );
};

export default TasksListComponent;
