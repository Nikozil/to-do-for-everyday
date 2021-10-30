import React from 'react';
import { ImCheckboxChecked } from 'react-icons/im';
import styles from './DoneTaskComponent.module.scss';

const DoneTaskComponent: React.FC<PropsType> = ({
  id,
  name,
  uncheckHandler,
}) => {
  const clickUncheckHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    uncheckHandler(id);
  };

  return (
    <div className={styles.content}>
      <span className={styles.task}>
        <span className={styles.taskName}>{name}</span>
      </span>
      <button
        name={'task done'}
        onClick={clickUncheckHandler}
        className={styles.button}
        data-testid="uncheck-button">
        <ImCheckboxChecked />
      </button>
    </div>
  );
};

export default DoneTaskComponent;

interface PropsType {
  id: string;
  name: string;
  uncheckHandler: (id: string) => void;
}
