import { describe, expect, test } from 'vitest';

import { clampCidrMask } from '@/utils/ip';

describe('clampCidrMask function', () => {
  describe('String maskValue', () => {
    testClampCidrMask('not an integer', 0);
    testClampCidrMask('-1', 0);
    testClampCidrMask('0', 0);
    testClampCidrMask('12', 12);
    testClampCidrMask('32', 32);
    testClampCidrMask('100', 32);
  });

  describe('Integer maskValue', () => {
    testClampCidrMask(-1, 0);
    testClampCidrMask(0, 0);
    testClampCidrMask(12, 12);
    testClampCidrMask(32, 32);
    testClampCidrMask(100, 32);
  });
});

// eslint-disable-next-line jsdoc/require-jsdoc
function testClampCidrMask(rawValue: string | number, expected: number) {
  test(`${rawValue} => ${expected}`, () => {
    expect(clampCidrMask(rawValue)).toBe(expected);
  });
}
