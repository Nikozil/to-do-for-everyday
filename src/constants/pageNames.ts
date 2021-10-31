import React from 'react';
// import { AiOutlineBorderlessTable } from 'react-icons/ai';
import { RiCheckboxBlankLine, RiCheckboxFill } from 'react-icons/ri';

export const NavLinks: NavLinkType[] = [
  {
    name: 'Checklist',
    nameRus: 'Список дел',
    link: '/checkList',
    Icon: RiCheckboxFill,
  },
  {
    name: 'Tomorrowlist',
    nameRus: 'Дела на завтра',
    link: '/tomorrowList',
    Icon: RiCheckboxBlankLine,
  },
  // {
  //   name: 'Table',
  //   nameRus: 'Таблица',
  //   link: '/table',
  //   Icon: AiOutlineBorderlessTable,
  // },
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
  '/tomorrowList': 'Дела на завтра',
};
interface PageNamesType {
  [key: string]: string;
}
