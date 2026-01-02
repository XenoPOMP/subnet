import { describe, test } from 'vitest';

import { NetworkInput } from '@/components/ui';

import { assertRendering } from '@test/assets';

describe('NetworkInput component', () => {
  test('It renders', () => {
    assertRendering(<NetworkInput />);
  });
});
