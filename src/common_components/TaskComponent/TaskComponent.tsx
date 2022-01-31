import React, { ReactNode } from 'react';
import styles from './TaskComponent.module.scss';
import cn from 'classnames';

const TaskComponent: React.FC<PropsType> = ({ children, border = false }) => {
  return (
    <div className={cn(styles.content, border ? styles['content_border'] : '')}>
      {children}
    </div>
  );
};

export default TaskComponent;

interface PropsType {
  children: ReactNode;
  border?: boolean;
}
