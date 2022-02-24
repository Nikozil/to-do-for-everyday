import React from 'react';
import { useDispatch } from 'react-redux';
import {
  archiveTask,
  deleteTask,
  Task,
} from '../../../Redux/modules/tasksSlice';
import { ArchiveButton, DeleteButton } from '../../Buttons/Buttons';
import styles from './OptionsButtons.module.scss';

const OptionsButtons: React.FC<PropsType> = ({ task }) => {
  const dispatch = useDispatch();

  const { id } = task;

  const taskComponentDeleteHandler = () => {
    dispatch(deleteTask(id));
  };

  const taskComponentArchiveHandler = () => {
    dispatch(archiveTask(task));
  };

  return (
    <div className={styles.buttons}>
      <ArchiveButton
        clickHandler={taskComponentArchiveHandler}
        label={'В архив'}
      />
      <DeleteButton
        clickHandler={taskComponentDeleteHandler}
        label={'Удалить'}
      />
    </div>
  );
};

export default OptionsButtons;

interface PropsType {
  task: Task;
}
