import { describe, expect, test } from 'vitest';

import { decimal } from '@/utils/base-number';

describe('Base number validation on creation', () => {
  test('Decimal value is always valid, because it is using native number type', () => {
    const value = decimal(12);
    expect(value.value).toBe(12);
  });
});
