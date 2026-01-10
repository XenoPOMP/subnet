import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { assertHookRendering } from 'xenopomp-essentials/vitest';

import { useStaticLocale } from '@/hooks';

import { createUseStaticLocaleTest } from '@test/assets';

describe('useStaticLocale', () => {
  afterEach(() => {
    cleanup();
  });

  test('It renders', () => {
    assertHookRendering(() => useStaticLocale());
  });

  test('Testing with test component', () => {
    const { getCurrentState } = createUseStaticLocaleTest({
      trackedState: '12',
    });

    expect(getCurrentState()).toBe('12');
  });
});
