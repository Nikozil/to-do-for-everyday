import React from 'react';
import { useSelector } from 'react-redux';
import SpinComponent from '../../../common_components/SpinComponent/SpinComponent';
import TaskMapComponent, {
  CurrentOptions,
  SetCurrentOptions,
} from '../../../common_components/TaskMapComponent/TaskMapComponent';
import TaskWithOptionsComponent from '../../../common_components/TaskWithOptionsComponent/TaskWithOptionsComponent';
import { Task } from '../../../Redux/modules/tasksSlice';
import {
  selectInitTasksStatus,
  selectTomorrowTasks,
} from '../../../Redux/selectors/tasksSelector';
import NewTaskWithAutocompleteForm from '../../Forms/NewTaskWithAutocompleteForm/NewTaskWithAutocompleteForm';
import styles from './TomorrowListPage.module.scss';

const TomorrowListPage = () => {
  const initTasksStatus = useSelector(selectInitTasksStatus);

  const tomorrowTasks = useSelector(selectTomorrowTasks);

  const duration = { days: 1 };

  const mapTomorrowTask = (
    task: Task,
    currentOptions: CurrentOptions,
    setCurrentOptions: SetCurrentOptions
  ) => (
    <TaskWithOptionsComponent
      task={task}
      currentOptions={currentOptions}
      setCurrentOptions={setCurrentOptions}
    />
  );

  return (
    <div className={styles['tomorrow-page']}>
      <div className={styles['tomorrow-page__content']}>
        <section className={styles['tomorrow-tasks']}>
          <div className={'my-4'}>
            <NewTaskWithAutocompleteForm duration={duration} />
          </div>

          {initTasksStatus ? (
            <>
              <h2 className="mb-3">Задачи на завтра</h2>
              <TaskMapComponent
                list={tomorrowTasks}
                stub={'Нет новых задач'}
                callback={mapTomorrowTask}
              />
            </>
          ) : (
            <SpinComponent styleClass={styles.spinner} />
          )}
        </section>
      </div>
    </div>
  );
};

export default TomorrowListPage;
