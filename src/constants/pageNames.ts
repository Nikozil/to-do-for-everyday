import React from 'react';
import { AiFillCheckCircle, AiOutlineBorderlessTable } from 'react-icons/ai';

export const NavLinks: NavLinkType[] = [
  {
    name: 'Checklist',
    nameRus: 'Список дел',
    link: '/checkList',
    Icon: AiFillCheckCircle,
  },
  {
    name: 'Table',
    nameRus: 'Таблица',
    link: '/table',
    Icon: AiOutlineBorderlessTable,
  },
];
interface NavLinkType {
  name: string;
  nameRus: string;
  link: string;
  Icon: React.FC;
}

export const PageNames: PageNamesType = {
  '/checkList': 'Список дел',
  '/table': 'Таблица',
  '/settings': 'Настройки',
};
interface PageNamesType {
  [key: string]: string;
}
