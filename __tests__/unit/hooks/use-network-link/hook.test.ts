import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { assertHookRendering } from 'xenopomp-essentials/vitest';

import { useNetworkLink } from '@/hooks';

import { createUseNetworkLinkTest, injectMatchMediaMock } from '@test/assets';

describe('useNetworkLink', () => {
  injectMatchMediaMock();

  afterEach(() => {
    cleanup();
  });

  test('It renders', () => {
    assertHookRendering(() => useNetworkLink(null, []));
  });

  test('Testing with test component', () => {
    const { getCurrentState } = createUseNetworkLinkTest({
      trackedState: '12',
    });

    expect(getCurrentState()).toBe('12');
  });
});
