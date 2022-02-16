import { Duration } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, doAgainTask, Task } from '../../Redux/modules/tasksSlice';
import { selectCompletedTasks } from '../../Redux/selectors/tasksSelector';
import { DeleteButton, DoItAgain } from '../Buttons/Buttons';
import TaskComponent from '../TaskComponent/TaskComponent';
import TaskMapComponent from '../TaskMapComponent/TaskMapComponent';
import TaskName from '../TaskName/TaskName';
import styles from './TaskAutocomplete.module.scss';

const TaskAutocomplete: React.FC<PropsType> = ({ filter, duration }) => {
  const dispatch = useDispatch();

  const completedTasks = useSelector(selectCompletedTasks);
  const filteredcompletedTasks = completedTasks.filter((task) =>
    task.data.name.match(filter)
  );

  const mapCompletedTask = (task: Task) => {
    const taskComponentDeleteHandler = () => {
      dispatch(deleteTask(task.id));
    };
    const taskComponentAgainHandler = () => {
      dispatch(doAgainTask(task, duration));
    };
    return (
      <TaskComponent key={task.id} border={true}>
        <DoItAgain clickHandler={taskComponentAgainHandler}>
          <TaskName>{task.data.name}</TaskName>
          <DeleteButton clickHandler={taskComponentDeleteHandler} />
        </DoItAgain>
      </TaskComponent>
    );
  };

  return (
    <div className={styles['autocomplete__wrapper']}>
      <div className={styles['autocomplete__container']}>
        <TaskMapComponent
          list={filteredcompletedTasks}
          stub={'Нет выполненых задач'}
          callback={mapCompletedTask}
        />
      </div>
    </div>
  );
};

export default TaskAutocomplete;

interface PropsType {
  filter: string;
  duration: Duration;
}
