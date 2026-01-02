import { describe, test } from 'vitest';
import { assertHookRendering } from 'xenopomp-essentials/vitest';

import { useNetworkStore } from '@/zustand';

describe('SettingsStore', () => {
  test('It renders', () => {
    assertHookRendering(() => useNetworkStore());
  });
});
