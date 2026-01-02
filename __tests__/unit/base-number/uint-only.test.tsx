import { describe, expect, test } from 'vitest';

import { binary, decimal } from '@/utils/base-number';

describe('Base numbers do not support negative numbers', () => {
  test('Decimal has minimum value', () => {
    expect(decimal(12).value).toBe(12);
    expect(decimal(0).value).toBe(0);
    expect(decimal(-10).value).toBe(0);
  });

  test('Binary can not be created from negative bitmap', () => {
    expect(binary('-101010')).toBe(null);
  });

  test('Binary made from conversion is not negative', () => {
    expect(decimal(-12).binary()!.value).toBe(0);
    expect(binary('1')!.decimal().binary()).toBe(1);
  });
});
