import { describe, expect, test } from 'vitest';

import { binary, decimal } from '@/utils/base-number';

describe('Base number validation on creation', () => {
  test('Decimal value is always valid, because it is using native number type', () => {
    const value = decimal(12);
    expect(value.value).toBe(12);
  });

  test('Binary can not be created from not a bitmap string', () => {
    expect(binary('not a binary')).toBe(null);
  });

  test('Binary creator does not accept decimal values as string', () => {
    expect(binary('120329')).toBe(null);
  });

  test('Binary does not accept negative values', () => {
    expect(binary('-12')).toBe(null);
    expect(binary('-10011010')).toBe(null);
  });
});
