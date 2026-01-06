import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { NetworkInput } from '@/components/ui';

describe('NetworkInput component', () => {
  test('It renders', () => {
    assertRendering(<NetworkInput target='root' />);
  });
});
