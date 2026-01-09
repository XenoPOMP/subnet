import { describe, test } from 'vitest';
import { assertHookRendering } from 'xenopomp-essentials/vitest';

import { useNetworkCredentialsForm } from '@/zustand';

describe('SettingsStore', () => {
  test('It renders', () => {
    assertHookRendering(() => useNetworkCredentialsForm());
  });
});
