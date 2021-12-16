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
    nameRus: 'Сегодня',
    link: '/checkList',
    Icon: RiCheckboxFill,
  },
  {
    name: 'Tomorrowlist',
    nameRus: 'Планы',
    link: '/tomorrowList',
    Icon: RiCheckboxBlankLine,
  },
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
  '/checkList': 'Сегодня',
  '/settings': 'Настройки',
  '/tomorrowList': 'Планы',
  '/history': 'История',
};
interface PageNamesType {
  [key: string]: string;
}
