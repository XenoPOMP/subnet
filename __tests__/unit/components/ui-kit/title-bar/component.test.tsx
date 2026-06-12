import type { usePathname, useRouter } from 'next/navigation';
import { describe, test, vi } from 'vitest';
import { assertRendering, injectMocks } from 'xenopomp-essentials/vitest';

import { TitleBar } from '@/components/ui/kit';

describe('TitleBar component', () => {
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

  test('It renders', () => {
    assertRendering(<TitleBar />);
  });
});
