import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LivedTask, Task } from '../../Redux/modules/tasksSlice';
import styles from './TaskMapComponent.module.scss';

const TaskMapComponent: React.FC<PropsType> = ({ list, stub, callback }) => {
  return (
    <>
      {list.length ? (
        <TransitionGroup component={'ul'} className={styles.list}>
          {list.map((task) => (
            <CSSTransitionWrapper
              task={task}
              callback={callback}
              key={task.id}
            />
          ))}
        </TransitionGroup>
      ) : (
        <span className={styles['taskList__comment']}>{stub}</span>
      )}
    </>
  );
};

export default TaskMapComponent;
const CSSTransitionWrapper: React.FC<WrapperPropsType> = ({
  task,
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
      <li ref={nodeRef} className={styles.li}>
        {callback(task)}
      </li>
    </CSSTransition>
  );
};

interface PropsType {
  list: UnionTask[];
  stub: string;
  callback: (task: any) => JSX.Element;
}

interface WrapperPropsType {
  task: UnionTask;
  callback: (task: any) => JSX.Element;
}

type UnionTask = Task | LivedTask;
