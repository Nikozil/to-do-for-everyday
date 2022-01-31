import React from 'react';
import { format } from 'date-fns';

import RaitingStarComponent from '../../../../common_components/RaitingStarComponent/RaitingStarComponent';
import { HistoryDay } from '../../../../Redux/modules/historySlice';
import { LivedTask } from '../../../../Redux/modules/tasksSlice';
import { FaCouch } from 'react-icons/fa';
import styles from './DayComponent.module.scss';

const DayComponent: React.FC<PropsType> = ({ day }) => {
  const { doneTasksList, score, timestamp, tag } = day;

  const isDoneTaskList = doneTasksList && doneTasksList.length;

  const date = format(timestamp, 'dd.MM.yyyy');

  const mapDoneTaskComponent = (task: LivedTask) => (
    <li className={styles['task-li']} key={task.id}>
      <span>{task.name}</span>
    </li>
  );

  const mapStars = (star: string, index: number) => {
    let scoreValue = index + 1;
    return (
      <RaitingStarComponent
        key={scoreValue}
        active={score >= scoreValue}
        size={15}
      />
    );
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.date}>{date}</h3>
      <ul className={styles['task-list']}>
        {isDoneTaskList ? (
          doneTasksList.map(mapDoneTaskComponent)
        ) : (
          <FaCouch size={35} />
        )}
      </ul>
      <div>
        <span className={styles.tag}>{tag ?? null}</span>
        <div className={styles.score}>{[...Array(5)].map(mapStars)}</div>
      </div>
    </section>
  );
};

export default DayComponent;

interface PropsType {
  day: HistoryDay;
}
