'use client';

import { useEffect, useRef, useState } from 'react';

import type { Locales } from '~/middleware.ts';
import { locales } from '~/middleware.ts';

/**
 * Statically parses locale in desktop environment.
 */
export const useStaticLocale = () => {
  const [locale, setLocale] = useState<Locales>('en-US');
  const loadingRef = useRef<boolean>(true);

  useEffect(() => {
    // Get browser language (e.g., 'en-US')
    const browserLocale = navigator.language;

    for (const loc of locales) {
      // Check for direct hits
      if (browserLocale === loc) {
        setLocale(loc);
        loadingRef.current = false;
        return;
      }

      // If string is alike defined ones, set state as well.
      if (loc.toLowerCase().includes(browserLocale.toLowerCase())) {
        setLocale(loc);
        loadingRef.current = false;
        return;
      }
    }

    // If no one locale is met, set default one
    setLocale('en-US');
    loadingRef.current = false;
  }, []);

  return { locale, isLoading: loadingRef.current };
};
