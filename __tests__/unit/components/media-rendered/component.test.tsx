import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { MediaRendered } from '@/components/ui';

describe('MediaRendered component', () => {
  test('It renders', () => {
    assertRendering(<MediaRendered />);
  });
});
