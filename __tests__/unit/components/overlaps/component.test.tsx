import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { Overlaps } from '@/components/ui';

describe('Overlaps component', () => {
  test('It renders', () => {
    assertRendering(<Overlaps />);
  });
});
