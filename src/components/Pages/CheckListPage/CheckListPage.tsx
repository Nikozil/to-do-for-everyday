import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import { addTask } from '../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../Redux/store';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './CheckListPage.module.scss';
import DayScoreComponent from './DayScoreComponent/DayScoreComponent';
import TasksListComponent from './TasksListComponent/TasksListComponent';

const CheckListPage = () => {
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );
  const dispatch = useDispatch();

  const newTaskSubmit = (task: string) => {
    dispatch(addTask(task, {}));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
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
        <div className={styles.dayScore}>
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
