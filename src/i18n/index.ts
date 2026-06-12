'use client';

import { useSearchParams } from 'next/navigation';
import type { Optional } from 'xenopomp-essentials';

import type { Locales } from '~/middleware.ts';

import { appLocales } from './locales';

// eslint-disable-next-line jsdoc/require-jsdoc
export const useTranslations = () => {
  const query = useSearchParams();
  const locale = query.get('locale') as Optional<Locales>;

  return {
    t: appLocales[(locale ?? 'en-US') as Locales],
  };
};
