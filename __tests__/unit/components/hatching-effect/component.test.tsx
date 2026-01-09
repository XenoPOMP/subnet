import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { HatchingEffect } from '@/components/ui';

describe('HatchingEffect component', () => {
  test('It renders', () => {
    assertRendering(<HatchingEffect />);
  });
});
