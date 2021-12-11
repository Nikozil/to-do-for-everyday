import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckButton,
  DeleteButton,
  RepeatButton,
  UncheckButton,
} from '../../../../assets/Buttons/Buttons';
import TaskComponent from '../../../../assets/TaskComponent/TaskComponent';
import TaskMapComponent from '../../../../assets/TaskMapComponent/TaskMapComponent';
import {
  checkTask,
  deleteTask,
  LivedTask,
  PartialTaskData,
  Task,
  uncheckTask,
  updateTask,
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
        <span className={styles['task__taskName']}>{task.data.name}</span>
      </span>
      <span className={styles['task__buttons']}>
        <RepeatButton task={task} clickHandler={taskComponentRepeatHandler} />
        <CheckButton
          task={task}
          clickHandler={taskComponentCheckHandler}
          className={styles['task__buttons_left-margin']}
        />
      </span>
    </TaskComponent>
  );

  const mapDoneTaskComponent = (task: LivedTask) => (
    <TaskComponent key={task.id} border={true}>
      <span className={styles.task}>
        <span className={styles['task__doneTaskName']}>{task.name}</span>
      </span>
      <span className={styles['task__buttons']}>
        <UncheckButton task={task} clickHandler={taskComponentUncheckHandler} />
      </span>
    </TaskComponent>
  );

  return (
    <>
      <div className="mb-3">Задачи</div>
      <TaskMapComponent
        list={currentTasks}
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
