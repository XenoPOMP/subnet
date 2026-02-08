import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { assertHookRendering } from 'xenopomp-essentials/vitest';

import { useOrigin } from '@/hooks';

import { createUseOriginTest } from '@test/assets';

describe('useOrigin', () => {
  afterEach(() => {
    cleanup();
  });

  test('It renders', () => {
    assertHookRendering(() => useOrigin());
  });

  test('Testing with test component', () => {
    const { getCurrentState } = createUseOriginTest({
      trackedState: '12',
    });

    expect(getCurrentState()).toBe('12');
  });
});
