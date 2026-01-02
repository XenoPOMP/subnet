import type { Locales } from '~/middleware.ts';

import type { LanguageResource } from '@/i18n/locales/default.ts';
import { en } from '@/i18n/locales/en.ts';
import { ru } from '@/i18n/locales/ru.ts';

export const appLocales: Record<Locales, LanguageResource> = {
  'ru-RU': ru,
  'en-US': en,
};
