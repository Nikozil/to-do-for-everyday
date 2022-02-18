import { hyphenateSync as hyphenateEn } from 'hyphen/en';
import { hyphenateSync as hyphenateRu } from 'hyphen/ru';

export const addHypens = (text: string) => hyphenateEn(hyphenateRu(text));
