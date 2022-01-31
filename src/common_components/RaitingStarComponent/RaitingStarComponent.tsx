import React from 'react';
import { ImStarEmpty, ImStarFull } from 'react-icons/im';

const RaitingStarComponent: React.FC<PropsType> = ({ active, size }) => {
  return active ? <ImStarFull size={size} /> : <ImStarEmpty size={size} />;
};

export default RaitingStarComponent;

interface PropsType {
  active: boolean;
  size: number;
}
