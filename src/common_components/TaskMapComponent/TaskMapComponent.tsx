import React, { Dispatch, SetStateAction, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UnionTask } from '../../Redux/modules/tasksSlice';
import styles from './TaskMapComponent.module.scss';

const TaskMapComponent: React.FC<PropsType> = ({
  list,
  stub,
  callback,
  currentOptions,
  setCurrentOptions,
}) => {
  return (
    <>
      {list.length ? (
        <TransitionGroup component={'ul'} className={styles.list}>
          {list.map((task) => (
            <CSSTransitionWrapper
              task={task}
              callback={callback}
              currentOptions={currentOptions}
              setCurrentOptions={setCurrentOptions}
              key={task.id}
            />
          ))}
        </TransitionGroup>
      ) : (
        <span className={styles.stub}>{stub}</span>
      )}
    </>
  );
};

export default TaskMapComponent;

const CSSTransitionWrapper: React.FC<WrapperPropsType> = ({
  task,
  currentOptions,
  setCurrentOptions,
  callback,
  ...rest
}) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      {...rest}
      nodeRef={nodeRef}
      timeout={500}
      classNames={{
        enterActive: styles['content_enter-active'],
        enterDone: styles['content_enter'],
        exitActive: styles['content_exit-active'],
        exitDone: styles['content_exit'],
      }}>
      <li ref={nodeRef} className={styles['content__li']}>
        {callback(task, currentOptions, setCurrentOptions)}
      </li>
    </CSSTransition>
  );
};

interface PropsType {
  list: UnionTask[];
  stub: string;
  callback: UnionCallback;
  currentOptions?: CurrentOptions;
  setCurrentOptions?: SetCurrentOptions;
}

interface WrapperPropsType {
  task: UnionTask;
  currentOptions?: CurrentOptions;
  setCurrentOptions?: SetCurrentOptions;
  callback: UnionCallback;
}

export type CurrentOptions = string | null;
export type SetCurrentOptions = Dispatch<SetStateAction<CurrentOptions>>;

type UnionCallback = any;
