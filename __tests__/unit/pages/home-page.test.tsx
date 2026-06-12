import type { usePathname, useRouter } from 'next/navigation';
import { describe, vi } from 'vitest';
import { injectMocks } from 'xenopomp-essentials/vitest';

import { testNextPage } from '@test/assets';

import Home from '../../../app/(translated)/page.tsx';

describe('Index page', () => {
  injectMocks(() => {
    vi.mock('next/navigation', () => {
      return {
        /** Mock implementation for useRouter */
        useRouter: (): Partial<ReturnType<typeof useRouter>> => {
          return {
            /** Mock implementation for useRouter().push */
            push() {},
          };
        },

        // eslint-disable-next-line jsdoc/require-jsdoc
        useSearchParams(): URLSearchParams {
          return new URLSearchParams();
        },

        /** Mock implementation for usePathname */
        usePathname: (): Partial<ReturnType<typeof usePathname>> => {
          return '/';
        },
      };
    });
  });

  testNextPage(<Home />);
});
