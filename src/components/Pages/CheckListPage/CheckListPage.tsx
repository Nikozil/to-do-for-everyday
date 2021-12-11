import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import { addTask } from '../../../Redux/modules/tasksSlice';
import { selectInitTasksStatus } from '../../../Redux/selectors/tasksSelector';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './CheckListPage.module.scss';
import DayScoreComponent from './DayScoreComponent/DayScoreComponent';
import TasksListComponent from './TasksListComponent/TasksListComponent';

const CheckListPage = () => {
  const dispatch = useDispatch();

  const initTasksStatus = useSelector(selectInitTasksStatus);

  const newTaskSubmit = (task: string) => {
    dispatch(addTask(task, {}));
  };

  return (
    <div className={styles['check-list']}>
      <div className={styles['check-list__content']}>
        <div className={styles.tasks}>
          <div className={'my-4'}>
            <NewTaskForm handleSubmit={newTaskSubmit} />
          </div>
          {initTasksStatus ? (
            <TasksListComponent />
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </div>
        <div className={styles['day-score']}>
          {initTasksStatus ? (
            <DayScoreComponent />
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckListPage;
