import { describe, test } from 'vitest';

import { Overlaps } from '@/components/ui';

import { assertRendering } from '@test/assets';

describe('Overlaps component', () => {
  test('It renders', () => {
    assertRendering(<Overlaps />);
  });
});
