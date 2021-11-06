import React from 'react';
// import { AiOutlineBorderlessTable } from 'react-icons/ai';
import {
  RiCheckboxBlankLine,
  RiCheckboxFill,
  RiFolderHistoryFill,
} from 'react-icons/ri';

export const NavLinksStart: NavLinkType[] = [
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
export const NavLinksEnd: NavLinkType[] = [
  {
    name: 'History',
    nameRus: 'История',
    link: '/history',
    Icon: RiFolderHistoryFill,
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
  '/tomorrowList': 'Дела на завтра',
};
interface PageNamesType {
  [key: string]: string;
}
