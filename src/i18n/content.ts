import contentEn from '../data/content.en.json';
import contentEs from '../data/content.es.json';
import type { Lang } from './ui';

export function getContent(lang: Lang) {
  return lang === 'es' ? contentEs : contentEn;
}
