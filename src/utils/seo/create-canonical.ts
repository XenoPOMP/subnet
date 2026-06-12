import type { LenientAutocomplete } from 'xenopomp-essentials';

import type { Locales } from '~/middleware';

/**
 * Appends given locale to given url string.
 */
export function createCanonical(
  url: string | URL,
  locale: LenientAutocomplete<Locales>,
) {
  const targetUrl = new URL(url);
  // Respect locale in url
  targetUrl.searchParams.set('locale', locale);
  // Format URL as string
  return targetUrl.toString();
}
