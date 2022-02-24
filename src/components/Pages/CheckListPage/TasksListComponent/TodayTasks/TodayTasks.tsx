import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskMapComponent, {
  CurrentOptions,
  SetCurrentOptions,
} from '../../../../../common_components/TaskMapComponent/TaskMapComponent';
import TaskWithOptionsComponent from '../../../../../common_components/TaskWithOptionsComponent/TaskWithOptionsComponent';
import { Task } from '../../../../../Redux/modules/tasksSlice';
import { selectCurrentTasks } from '../../../../../Redux/selectors/tasksSelector';

const TodayTasks = () => {
  const [currentOptions, setCurrentOptions] = useState<CurrentOptions>(null);

  const currentTasks = useSelector(selectCurrentTasks);

  const mapTaskComponent = (
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
    <>
      <h2 className="mb-3">Задачи</h2>
      <TaskMapComponent
        list={currentTasks}
        stub={'Нет новых задач'}
        callback={mapTaskComponent}
        currentOptions={currentOptions}
        setCurrentOptions={setCurrentOptions}
      />
    </>
  );
};

export default TodayTasks;
