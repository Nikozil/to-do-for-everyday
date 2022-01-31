import React from 'react';
import cn from 'classnames';
import styles from './Paginator.module.scss';

const Paginator: React.FC<PropsType> = ({
  pageNames,
  currentPage,
  clickHandler,
}) => {
  return (
    <nav className={styles.paginator} aria-label="paginator ">
      <ul className="pagination pagination-sm flex-wrap justify-content-center mb-1">
        {pageNames.map((name) => (
          <li
            className={cn(
              'page-item',
              styles['paginator__button'],
              name === currentPage ? 'active' : ''
            )}
            onClick={() => clickHandler(name)}
            key={name}>
            <span
              className={cn(
                'page-link',
                styles['paginator__name'],
                name === currentPage ? styles['paginator__name_active'] : ''
              )}>
              {name}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;

interface PropsType {
  pageNames: number[];
  currentPage: number;
  clickHandler: (name: number) => void;
}
