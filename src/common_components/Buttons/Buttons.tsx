import React, { ReactNode } from 'react';
import cn from 'classnames';
import {
  ImCheckboxUnchecked,
  ImCross,
  ImCheckboxChecked,
  ImEqualizer2,
} from 'react-icons/im';
import {
  RiPushpinFill,
  RiPushpinLine,
  RiArrowGoForwardFill,
} from 'react-icons/ri';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

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
    event.stopPropagation();
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

export const DoItAgainButton: React.FC<DoItAgainButtonPropsType> = ({
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

export const DoItAgain: React.FC<DoItAgainPropsType> = ({
  task,
  children,
  clickHandler,
}) => {
  const clickAgainHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    clickHandler(task);
  };

  return (
    <span
      aria-label={'again task'}
      onClick={clickAgainHandler}
      className={styles['again-button']}
      data-testid="again">
      {children}
    </span>
  );
};

export const OptionsButton: React.FC<OptionsPropsType> = ({
  className = '',
  clickHandler,
}) => {
  const clickOptionsHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler();
  };

  return (
    <button
      aria-label={'options task'}
      name={'options task'}
      onClick={clickOptionsHandler}
      className={cn(styles.button, className)}
      data-testid="options-button">
      <ImEqualizer2 />
    </button>
  );
};

export const NextButton: React.FC<NextPropsType> = ({
  className = '',
  clickHandler,
}) => {
  const clickNextHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler();
  };

  return (
    <button
      aria-label={'next'}
      name={'next'}
      onClick={clickNextHandler}
      className={cn(styles.button, className)}
      data-testid="next-button">
      <MdNavigateNext />
    </button>
  );
};

export const PrevButton: React.FC<NextPropsType> = ({
  className = '',
  clickHandler,
}) => {
  const clickPrevHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickHandler();
  };

  return (
    <button
      aria-label={'prev'}
      name={'prev'}
      onClick={clickPrevHandler}
      className={cn(styles.button, className)}
      data-testid="prev-button">
      <MdNavigateBefore />
    </button>
  );
};

interface DoItAgainPropsType {
  task: Task;
  children: ReactNode;
  clickHandler: (task: Task) => void;
}
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
interface DoItAgainButtonPropsType {
  task: Task;
  className?: string;
  clickHandler: (task: Task) => void;
}
interface OptionsPropsType {
  className?: string;
  clickHandler: () => void;
}
interface NextPropsType {
  className?: string;
  clickHandler: () => void;
}
