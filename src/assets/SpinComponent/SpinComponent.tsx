import React from 'react';
import cn from 'classnames';

const SpinComponent: React.FC<PropsType> = ({ style }) => {
  return (
    <div className={cn('spinner-border ', style)} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default SpinComponent;

interface PropsType {
  style: string;
}
