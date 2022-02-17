import { Priority } from '../../Redux/modules/tasksSlice';

export const convertPriorityValue = (value: number | Priority | undefined) => {
  switch (value) {
    case 0:
      return 'express';

    case 1:
      return 'regular';

    case 2:
      return 'important';

    case 'express':
      return 0;

    case undefined:
      return 1;

    case 'regular':
      return 1;

    case 'important':
      return 2;

    default:
      throw new Error('Нет такого значения');
  }
};
