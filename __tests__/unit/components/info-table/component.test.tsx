import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { InfoTable } from '@/components/ui';

describe('InfoTable component', () => {
  test('It renders', () => {
    assertRendering(<InfoTable />);
  });
});
