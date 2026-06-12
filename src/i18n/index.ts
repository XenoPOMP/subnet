'use client';

import type { Locales } from '~/middleware.ts';

import { useCurrentLocale } from '@/hooks';

import { appLocales } from './locales';

// eslint-disable-next-line jsdoc/require-jsdoc
export const useTranslations = () => {
  const locale = useCurrentLocale();

  return {
    t: appLocales[(locale ?? 'en-US') as Locales],
  };
};
