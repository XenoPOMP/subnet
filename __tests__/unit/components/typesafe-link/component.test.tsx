import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { TypesafeLink } from '@/components/ui';

describe('TypesafeLink component', () => {
  test('It renders', () => {
    assertRendering(
      <TypesafeLink
        href='/[lang]/page.tsx/:number'
        params={{
          number: '1',
        }}
      />,
    );
  });
});
