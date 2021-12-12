import React from 'react';
import { format } from 'date-fns';

import RaitingStarComponent from '../../../../assets/RaitingStarComponent/RaitingStarComponent';
import { HistoryDay } from '../../../../Redux/modules/historySlice';
import { LivedTask } from '../../../../Redux/modules/tasksSlice';
import styles from './DayComponent.module.scss';
const DayComponent: React.FC<PropsType> = ({ day }) => {
  const { doneTasksList, score, timestamp, tag } = day;
  const mapDoneTaskComponent = (task: LivedTask) => (
    <li className={styles['task-li']} key={task.id}>
      <span>{task.name}</span>
    </li>
  );
  const date = format(timestamp, 'dd.MM.yyyy');
  return (
    <section className={styles.container}>
      <h3 className={styles.date}>{date}</h3>
      <ul className={styles['task-list']}>
        {doneTasksList &&
          doneTasksList.length &&
          doneTasksList.map(mapDoneTaskComponent)}
      </ul>
      <span className={styles.tag}>{tag && <>{tag}</>}</span>
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
    </section>
  );
};

export default DayComponent;

interface PropsType {
  day: HistoryDay;
}
