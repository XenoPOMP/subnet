'use client';

import { useSearchParams } from 'next/navigation';
import type { Optional } from 'xenopomp-essentials';

import type { Locales } from '~/middleware.ts';

/**
 * Parses current locale from searchParams.
 */
export const useCurrentLocale = () => {
  const query = useSearchParams();
  return query.get('locale') as Optional<Locales>;
};
