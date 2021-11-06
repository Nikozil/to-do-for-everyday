import React, { ReactNode } from 'react';
import styles from './TaskComponent.module.scss';

const TaskComponent: React.FC<PropsType> = ({ children }) => {
  return <li className={styles.content}>{children}</li>;
};

export default TaskComponent;

interface PropsType {
  children: ReactNode;
}
