import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { TitleBar } from '@/components/ui/kit';

describe('TitleBar component', () => {
  test('It renders', () => {
    assertRendering(<TitleBar />);
  });
});
