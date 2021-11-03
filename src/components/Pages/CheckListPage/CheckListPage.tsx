import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinComponent from '../../../assets/SpinComponent/SpinComponent';
import { addTask, getTasks } from '../../../Redux/modules/tasksSlice';
import { AppStateType } from '../../../Redux/store';
import NewTaskForm from '../../Forms/NewTaskForm/NewTaskForm';
import styles from './CheckListPage.module.scss';
import DayScoreComponent from './DayScoreComponent/DayScoreComponent';
import TasksListComponent from './TasksListComponent/TasksListComponent';

const CheckListPage = () => {
  const time = useSelector((state: AppStateType) => state.clock.time);
  const initTasksStatus = useSelector(
    (state: AppStateType) => state.tasks.initStatus
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const newTaskSubmit = (task: string) => {
    dispatch(addTask(task, time));
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
            <SpinComponent style={styles.spinner} />
          )}
        </div>
        <div className={styles.dayScore}>
          {initTasksStatus ? (
            <DayScoreComponent />
          ) : (
            <SpinComponent style={styles.spinner} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckListPage;
