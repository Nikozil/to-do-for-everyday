import React, { ReactNode } from 'react';
import styles from './TaskName.module.scss';

const TaskName: React.FC<PropsType> = ({ children }) => {
  return <span className={styles['taskName']}>{children}</span>;
};

export default TaskName;

interface PropsType {
  children: ReactNode;
}
