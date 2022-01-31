import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpinComponent from '../../../common_components/SpinComponent/SpinComponent';
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
    <section className={styles['check-list']}>
      <div className={styles['check-list__content']}>
        <section className={styles.tasks}>
          <div className={'my-4'}>
            <NewTaskForm handleSubmit={newTaskSubmit} />
          </div>
          {initTasksStatus ? (
            <TasksListComponent />
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </section>
        <section className={styles['day-score']}>
          {initTasksStatus ? (
            <DayScoreComponent />
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </section>
      </div>
    </section>
  );
};

export default CheckListPage;
