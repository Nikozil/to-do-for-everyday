import React from 'react';
import cn from 'classnames';
import styles from './Paginator.module.scss';

const Paginator: React.FC<PropsType> = ({
  pageNames,
  currentPage,
  clickHandler,
}) => {
  return (
    <nav className={styles.nav} aria-label="paginator ">
      <ul className="pagination pagination-sm flex-wrap justify-content-center mb-1">
        {pageNames.map((name) => (
          <li
            className={cn(
              'page-item',
              styles.button,
              name === currentPage ? 'active' : ''
            )}
            onClick={() => clickHandler(name)}
            key={name}>
            <span
              className={cn(
                'page-link',
                styles.name,
                name === currentPage ? styles.active : ''
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
