import { describe, test } from 'vitest';

import { TitleBar } from '@/components/ui/kit';

import { assertRendering } from '@test/assets';

describe('TitleBar component', () => {
  test('It renders', () => {
    assertRendering(<TitleBar />);
  });
});
