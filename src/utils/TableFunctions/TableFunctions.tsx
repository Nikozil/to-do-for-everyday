import { getDate, getMonth, getYear } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';

export const getDaysCellsArray = (
  start: number,
  end: number,
  interval: number,
  date: Date,
  navDate: Date,
  className = '',
  selectedClassName = '',
  currentClassName = '',
  cellClassName = ''
) => {
  const selectedDate = getDate(date);
  const selectedMonth =
    getMonth(navDate) === getMonth(date) && getYear(date) === getYear(navDate);

  const currentDate = (date: number) =>
    date === getDate(new Date()) &&
    getMonth(new Date()) === getMonth(navDate) &&
    getYear(new Date()) === getYear(navDate);

  let array = [];

  for (let d = start; d <= end; d = d + interval) {
    const selectedStyle =
      d === selectedDate && selectedMonth ? selectedClassName : null;

    const currentStyle = currentDate(d) ? currentClassName : null;

    array.push(
      <td key={uuidv4()} className={cellClassName}>
        <div className={cn(className, selectedStyle, currentStyle)}>{d}</div>
      </td>
    );
  }
  return array;
};

// export const getDaysRowsArray = (totalArray: JSX.Element[]) => {
//   let rows = [] as JSX.Element[][];
//   let cells = [] as JSX.Element[];

//   totalArray.forEach((row, i) => {
//     if (i % 7 !== 0) {
//       cells.push(row);
//     } else {
//       rows.push(cells);
//       cells = [];
//       cells.push(row);
//     }
//     if (i === totalArray.length - 1) {
//       rows.push(cells);
//     }
//   });

//   return rows;
// };

export const getCellsfromArray = (array: any[], className = '') => {
  let cells = [] as JSX.Element[];

  array.forEach((el) => {
    cells.push(
      <td key={uuidv4()} className={className}>
        {el}
      </td>
    );
  });
  return cells;
};

export const getRowsArray = (totalArray: JSX.Element[], columns = 3) => {
  let rows = [] as JSX.Element[][];
  let cells = [] as JSX.Element[];

  totalArray.forEach((row, i) => {
    if (i % columns !== 0 || i === 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
  });
  rows.push(cells);

  return rows;
};

export const getTable = (rows: JSX.Element[][]) => {
  return rows.map((row) => <tr key={uuidv4()}>{row}</tr>);
};
