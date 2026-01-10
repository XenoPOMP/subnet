import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { ColorPicker } from '@/components/ui/kit';

describe('ColorPicker component', () => {
  test('It renders', () => {
    assertRendering(<ColorPicker />);
  });
});
