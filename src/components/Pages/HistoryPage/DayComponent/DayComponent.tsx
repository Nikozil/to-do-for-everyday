import React from 'react';
import { format } from 'date-fns';

import RaitingStarComponent from '../../../../assets/RaitingStarComponent/RaitingStarComponent';
import TaskComponent from '../../../../assets/TaskComponent/TaskComponent';
import { HistoryDay } from '../../../../Redux/modules/historySlice';
import { LivedTask } from '../../../../Redux/modules/tasksSlice';
import styles from './DayComponent.module.scss';
const DayComponent: React.FC<PropsType> = ({ day }) => {
  const { doneTasksList, score, timestamp, tag } = day;
  const mapDoneTaskComponent = (task: LivedTask) => (
    <TaskComponent key={task.id}>
      <span className={styles.task}>
        <span className={styles.doneTaskName}>{task.name}</span>
      </span>
    </TaskComponent>
  );
  const date = format(timestamp, 'dd.MM.yyyy');
  return (
    <div className={styles.container}>
      <div className={styles.date}>{date}</div>
      <div className={styles['task-list']}>
        {doneTasksList &&
          doneTasksList.length &&
          doneTasksList.map(mapDoneTaskComponent)}
      </div>
      <div className={styles.tag}>{tag && <>{tag}</>}</div>
      <div className={styles.score}>
        {[...Array(5)].map((star, index) => {
          let scoreValue = index + 1;
          return (
            <RaitingStarComponent
              key={scoreValue}
              active={score >= scoreValue}
              size={15}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DayComponent;

interface PropsType {
  day: HistoryDay;
}
