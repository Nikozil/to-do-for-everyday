import cn from 'classnames';
import React from 'react';
import { addHypens } from '../../utils/TextFunctions/TextFunctions';
import styles from './TaskName.module.scss';

const TaskName: React.FC<PropsType> = ({ name, className }) => {
  const hyphenateName = addHypens(name);
  return (
    <span className={cn(styles['taskName'], className)}>{hyphenateName}</span>
  );
};

export default TaskName;

interface PropsType {
  name: string;
  className?: string;
}
