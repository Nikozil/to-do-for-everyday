import React from 'react';
import { useSelector } from 'react-redux';
import SpinComponent from '../../../common_components/SpinComponent/SpinComponent';
import { selectInitTasksStatus } from '../../../Redux/selectors/tasksSelector';
import NewTaskWithAutocompleteForm from '../../Forms/NewTaskWithAutocompleteForm/NewTaskWithAutocompleteForm';
import styles from './CheckListPage.module.scss';
import DayScoreComponent from './DayScoreComponent/DayScoreComponent';
import TasksListComponent from './TasksListComponent/TasksListComponent';

const CheckListPage = () => {
  const initTasksStatus = useSelector(selectInitTasksStatus);

  const duration = { days: 0 };

  return (
    <section className={styles['check-list']}>
      <div className={styles['check-list__content']}>
        <section className={styles.tasks}>
          <div className={'my-4'}>
            <NewTaskWithAutocompleteForm duration={duration} />
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
