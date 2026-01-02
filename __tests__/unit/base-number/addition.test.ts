import { describe, expect, test } from 'vitest';

import { binary, decimal } from '@/utils/base-number';

describe('Base number addition vice versa', () => {
  test('dec + dec', () => {
    const lhs = decimal(12);
    const rhs = decimal(10);
    const result = lhs.plus(rhs);
    expect(result.value).toBe(22);
  });

  test('dec + bin', () => {
    const lhs = decimal(100);
    const rhs = binary('1100')!;
    const result = lhs.plus(rhs);
    expect(result.value).toBe(112);
  });

  test('bin + bin', () => {
    const lhs = binary('1100')!;
    const rhs = binary('1')!;
    const result = lhs.plus(rhs);
    expect(result.value).toBe('1101');
    expect(result.decimal().value).toBe(13);
  });

  test('bin + dec', () => {
    const lhs = binary('1100')!;
    const rhs = decimal(1)!;
    const result = lhs.plus(rhs);
    expect(result.value).toBe('1101');
    expect(result.decimal().value).toBe(13);
  });
});
