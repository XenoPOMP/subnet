import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { NetSlider } from '@/components/ui';

describe('NetSlider component', () => {
  test('It renders', () => {
    assertRendering(<NetSlider />);
  });
});
