---
to: __tests__/unit/zustand/<%= h.changeCase.paramCase(name) %>.test.tsx
---
import { describe, test } from 'vitest';
import { assertHookRendering } from 'xenopomp-essentials/vitest';

import { use<%= h.changeCase.pascalCase(name) %> } from '@/zustand';

describe('SettingsStore', () => {
  test('It renders', () => {
    assertHookRendering(() => use<%= h.changeCase.pascalCase(name) %>());
  });
});

