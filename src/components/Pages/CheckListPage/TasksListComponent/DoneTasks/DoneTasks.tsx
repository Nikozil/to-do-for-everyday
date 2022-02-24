import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UncheckButton } from '../../../../../common_components/Buttons/Buttons';
import TaskComponent from '../../../../../common_components/TaskComponent/TaskComponent';
import TaskMapComponent from '../../../../../common_components/TaskMapComponent/TaskMapComponent';
import TaskName from '../../../../../common_components/TaskName/TaskName';
import {
  LivedTask,
  uncheckTask,
} from '../../../../../Redux/modules/tasksSlice';
import { selectDoneTasks } from '../../../../../Redux/selectors/tasksSelector';
import styles from './DoneTasks.module.scss';

const DoneTasks = () => {
  const dispatch = useDispatch();

  const doneTasks = useSelector(selectDoneTasks);

  const mapDoneTaskComponent = (task: LivedTask) => {
    const taskComponentUncheckHandler = () => {
      dispatch(uncheckTask(task));
    };

    return (
      <TaskComponent key={task.id} border={true}>
        <TaskName name={task.name} />
        <span className={styles['task__buttons']}>
          <UncheckButton clickHandler={taskComponentUncheckHandler} />
        </span>
      </TaskComponent>
    );
  };

  return (
    <>
      <h2 className="mb-3">Выполнено</h2>
      <TaskMapComponent
        list={doneTasks}
        stub={'Список пуст'}
        callback={mapDoneTaskComponent}
      />
    </>
  );
};

export default DoneTasks;
