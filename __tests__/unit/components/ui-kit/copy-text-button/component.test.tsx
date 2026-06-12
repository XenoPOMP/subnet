import { describe, test, vi } from 'vitest';
import { assertRendering, injectMocks } from 'xenopomp-essentials/vitest';

import { CopyTextButton } from '@/components/ui/kit';

describe('CopyTextButton component', () => {
  injectMocks(() => {
    vi.mock('next/navigation', () => {
      return {
        // eslint-disable-next-line jsdoc/require-jsdoc
        useSearchParams(): URLSearchParams {
          return new URLSearchParams();
        },
      };
    });
  });

  test('It renders', () => {
    assertRendering(<CopyTextButton text='' />);
  });
});
