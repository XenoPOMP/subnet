'use client';

import type { Locales } from '~/middleware.ts';

import { appLocales } from './locales';

// eslint-disable-next-line jsdoc/require-jsdoc
export const useTranslations = () => {
  // const params = useParams<{ lang: string }>();
  // TODO Replace that with query params read
  const params: any = undefined;

  return {
    t: appLocales[(params?.lang ?? 'en-US') as Locales],
  };
};
