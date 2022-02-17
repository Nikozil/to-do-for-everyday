import { getTime } from 'date-fns';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  archiveTask,
  deleteTask,
  Task,
  updateTask,
} from '../../Redux/modules/tasksSlice';
import { ArchiveButton, DeleteButton } from '../Buttons/Buttons';
import Calendar from '../Calendar/Calendar';
import styles from './OptionsComponent.module.scss';
import RepeatRange from './RepeatRange/RepeatRange';

const OptionsComponent: React.FC<PropsType> = ({ task }) => {
  const dispatch = useDispatch();

  const { id } = task;
  const { time, repeat } = task.data;

  const date = new Date(time);

  const setDateHandler = (date: Date) => {
    const time = getTime(date);

    dispatch(updateTask(id, { time }));
  };

  const setRepeatHandler = (repeat: number) => {
    dispatch(updateTask(id, { repeat }));
  };

  const taskComponentDeleteHandler = () => {
    dispatch(deleteTask(id));
  };
  const taskComponentArchiveHandler = () => {
    dispatch(archiveTask(task));
  };

  return (
    <div className={styles.options}>
      <div className={styles.calendar}>
        <Calendar date={date} setDate={setDateHandler} />
      </div>
      <div className={styles.fader}>
        <RepeatRange repeat={repeat} changeHandler={setRepeatHandler} />
        <div className={styles.buttons}>
          <ArchiveButton
            clickHandler={taskComponentArchiveHandler}
            label={'Архив'}
          />
          <DeleteButton
            clickHandler={taskComponentDeleteHandler}
            label={'Удалить'}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionsComponent;

interface PropsType {
  task: Task;
}
