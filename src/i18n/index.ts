'use client';

import { useParams } from 'next/navigation';

import type { Locales } from '~/middleware.ts';

import { appLocales } from './locales';

// eslint-disable-next-line jsdoc/require-jsdoc
export const useTranslations = () => {
  const params = useParams<{ lang: string }>();
  return {
    t: appLocales[(params?.lang ?? 'en-US') as Locales],
  };
};
