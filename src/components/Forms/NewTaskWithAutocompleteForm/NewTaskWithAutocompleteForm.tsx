import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TaskAutocomplete from '../../../common_components/TaskAutocomplete/TaskAutocomplete';
import useIsMounted from '../../../hooks/useIsMounted';
import { addTask } from '../../../Redux/modules/tasksSlice';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

const NewTaskWithAutocompleteForm: React.FC<PropsType> = ({ duration }) => {
  const dispatch = useDispatch();

  const [focus, setFocus] = useState(false);
  const [filter, setFilter] = useState('');
  const isMounted = useIsMounted();

  const handleSubmit = (task: string) => {
    dispatch(addTask(task, duration));
  };

  return (
    <>
      <NewTaskForm
        handleSubmit={handleSubmit}
        setFocus={setFocus}
        setFilter={setFilter}
        isMounted={isMounted}
      />
      {focus ? <TaskAutocomplete filter={filter} duration={duration} /> : null}
    </>
  );
};

export default NewTaskWithAutocompleteForm;

interface PropsType {
  duration: Duration;
}
