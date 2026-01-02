import { describe, expect, test } from 'vitest';

import { binary, decimal } from '@/utils/base-number';

describe('Base number negation vice versa', () => {
  test('dec - dec', () => {
    const lhs = decimal(12);
    const rhs = decimal(10);
    const result = lhs.minus(rhs);
    expect(result.value).toBe(2);
  });

  test('dec - dec (overflow safe)', () => {
    const lhs = decimal(12);
    const rhs = decimal(100);
    const result = lhs.minus(rhs);
    expect(result.value).toBe(0);
  });

  test('dec - bin', () => {
    const lhs = decimal(100);
    const rhs = binary('1100')!;
    const result = lhs.minus(rhs);
    expect(result.value).toBe(100 - 12);
  });

  test('dec - bin (overflow safe)', () => {
    const lhs = decimal(11);
    const rhs = binary('1100')!;
    const result = lhs.minus(rhs);
    expect(result.value).toBe(0);
  });

  test('bin - bin', () => {
    const lhs = binary('1100')!;
    const rhs = binary('1')!;
    const result = lhs.minus(rhs);
    expect(result.value).toBe('1011');
    expect(result.decimal().value).toBe(11);
  });

  test('bin - bin (overflow safe)', () => {
    const lhs = binary('1')!;
    const rhs = binary('11')!;
    const result = lhs.minus(rhs);
    expect(result.value).toBe('0');
    expect(result.decimal().value).toBe(0);
  });

  test('bin - dec', () => {
    const lhs = binary('1100')!;
    const rhs = decimal(1)!;
    const result = lhs.minus(rhs);
    expect(result.value).toBe('1011');
    expect(result.decimal().value).toBe(11);
  });

  test('bin - dec (overflow safe)', () => {
    const lhs = binary('1')!;
    const rhs = decimal(10)!;
    const result = lhs.minus(rhs);
    expect(result.value).toBe('0');
    expect(result.decimal().value).toBe(0);
  });
});
