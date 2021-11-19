import { format } from 'date-fns';

export const formatDate = (time: number) => {
  return format(time, 'dd.MM.yyyy');
};
