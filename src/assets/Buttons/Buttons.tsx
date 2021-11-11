import React from 'react';
import cn from 'classnames';
import {
  ImCheckboxUnchecked,
  ImCross,
  ImCheckboxChecked,
} from 'react-icons/im';
import {
  RiPushpinFill,
  RiPushpinLine,
  RiArrowGoForwardFill,
} from 'react-icons/ri';

import {
  LivedTask,
  PartialTaskData,
  Task,
} from '../../Redux/modules/tasksSlice';
import styles from './Buttons.module.scss';

export const DeleteButton: React.FC<DeletePropsType> = ({
  task,
  className = '',
  clickHandler,
}) => {
  const { id } = task;
  const clickDeleteHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler(id);
  };

  return (
    <button
      aria-label={'delete task'}
      name={'delete task'}
      onClick={clickDeleteHandler}
      className={cn(styles.button, className)}
      data-testid="delete-button">
      <ImCross />
    </button>
  );
};

export const RepeatButton: React.FC<RepeatPropsType> = ({
  task,
  className = '',
  clickHandler,
}) => {
  const { id, data } = task;
  const { repeat } = data;

  const clickRepeatHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler(id, { repeat: repeat ? 0 : 1 });
  };

  return (
    <button
      aria-label={'repeat task'}
      name={'repeat task'}
      onClick={clickRepeatHandler}
      className={cn(styles.button, className)}
      data-testid="repeat-button">
      {repeat ? <RiPushpinFill /> : <RiPushpinLine />}
    </button>
  );
};
export const CheckButton: React.FC<CheckPropsType> = ({
  task,
  className = '',
  clickHandler,
}) => {
  const clickCheckHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler(task);
  };
  return (
    <button
      aria-label={'task check'}
      name={'task check'}
      onClick={clickCheckHandler}
      className={cn(styles.button, className)}
      data-testid="check-button">
      <ImCheckboxUnchecked />
    </button>
  );
};
export const UncheckButton: React.FC<UncheckPropsType> = ({
  task,
  className = '',
  clickHandler,
}) => {
  const clickUncheckHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler(task);
  };
  return (
    <button
      aria-label={'task uncheck'}
      name={'task uncheck'}
      onClick={clickUncheckHandler}
      className={cn(styles.button, className)}
      data-testid="uncheck-button">
      <ImCheckboxChecked />
    </button>
  );
};

export const DoItAgainButton: React.FC<DoItAgainPropsType> = ({
  task,
  className = '',
  clickHandler,
}) => {
  const clickAgainHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler(task);
  };

  return (
    <button
      aria-label={'again task'}
      name={'again task'}
      onClick={clickAgainHandler}
      className={cn(styles.button, className)}
      data-testid="again-button">
      <RiArrowGoForwardFill />
    </button>
  );
};

interface CheckPropsType {
  task: Task;
  className?: string;
  clickHandler: (task: Task) => void;
}
interface UncheckPropsType {
  task: LivedTask;
  className?: string;
  clickHandler: (task: LivedTask) => void;
}
interface DeletePropsType {
  task: Task;
  className?: string;
  clickHandler: (id: string) => void;
}
interface RepeatPropsType {
  task: Task;
  className?: string;
  clickHandler: (id: string, data: PartialTaskData) => void;
}
interface DoItAgainPropsType {
  task: Task;
  className?: string;
  clickHandler: (task: Task) => void;
}
