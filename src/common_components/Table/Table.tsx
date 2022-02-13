import { FC, MouseEventHandler } from 'react';
import {
  getCellsfromArray,
  getRowsArray,
  getTable,
} from '../../utils/TableFunctions/TableFunctions';
import cn from 'classnames';
import styles from './Table.module.scss';

const Table: FC<Props> = ({
  array,
  columns,
  header,
  clickHandle,
  className = '',
}) => {
  const cells = getCellsfromArray(array, cn(styles.cell, className));

  const rows = getRowsArray(cells, columns);

  let table = getTable(rows);

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          <th colSpan={columns}>{header}</th>
        </tr>
      </thead>
      <tbody onClick={clickHandle} className={styles.tbody}>
        {table}
      </tbody>
    </table>
  );
};

export default Table;

interface Props {
  array: any[];
  header: string;
  columns: number;
  clickHandle: MouseEventHandler<HTMLTableSectionElement>;
  className?: string;
}
