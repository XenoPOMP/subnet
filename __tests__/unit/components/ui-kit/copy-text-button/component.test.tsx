import { describe, test } from 'vitest';
import { assertRendering } from 'xenopomp-essentials/vitest';

import { CopyTextButton } from '@/components/ui/kit';

describe('CopyTextButton component', () => {
  test('It renders', () => {
    assertRendering(<CopyTextButton />);
  });
});
