import React from 'react';
import { useSelector } from 'react-redux';
import TaskMapComponent, {
  CurrentOptions,
  SetCurrentOptions,
} from '../../../../common_components/TaskMapComponent/TaskMapComponent';
import TaskWithOptionsComponent from '../../../../common_components/TaskWithOptionsComponent/TaskWithOptionsComponent';
import { Task, UnionTask } from '../../../../Redux/modules/tasksSlice';
import styles from './PlanComponent.module.scss';

const PlanComponent: React.FC<any> = ({
  date,
  title,
  selector,
  currentOptions,
  setCurrentOptions,
}) => {
  const list = useSelector(selector) as UnionTask[];

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
    <section className={styles['plan']}>
      <h3 className={styles['plan__title']}>
        {date && <span className={styles['plan__date']}>{date}</span>}{' '}
        {title && title}
      </h3>
      <TaskMapComponent
        list={list}
        stub={''}
        callback={mapTomorrowTask}
        currentOptions={currentOptions}
        setCurrentOptions={setCurrentOptions}
      />
    </section>
  );
};

export default PlanComponent;
