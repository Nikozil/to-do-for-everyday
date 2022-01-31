import React from 'react';
import cn from 'classnames';

const SpinComponent: React.FC<PropsType> = ({ styleClass }) => {
  return (
    <div className={cn('spinner-border', styleClass)} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default SpinComponent;

interface PropsType {
  styleClass: string;
}
