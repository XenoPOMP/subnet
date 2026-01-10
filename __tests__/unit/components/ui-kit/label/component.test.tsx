import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { Label } from '@/components/ui/kit';

describe('Label component', () => {
  test('It renders', () => {
    assertRendering(<Label />);
  });
});
