import React from 'react';
import DoneTasks from './DoneTasks/DoneTasks';
import TodayTasks from './TodayTasks/TodayTasks';

const TasksListComponent = () => {
  return (
    <>
      <TodayTasks />

      <DoneTasks />
    </>
  );
};

export default TasksListComponent;
