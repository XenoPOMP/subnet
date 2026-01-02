import { describe, expect, test } from 'vitest';

import { binary, decimal } from '@/utils/base-number';
import type { BaseNumberType } from '@/utils/base-number/types';

describe('Base number conversions', () => {
  // eslint-disable-next-line jsdoc/require-jsdoc
  const testConversion = (
    raw: string | number,
    key: BaseNumberType,
    expected: string | number,
  ) => {
    expect(
      (typeof raw === 'string' ? binary(raw) : decimal(raw))?.[key]().value,
    ).toBe(expected);
  };

  test('dec2dec', () => {
    testConversion(12, 'decimal', 12);
    testConversion(0, 'decimal', 0);
    testConversion(-12, 'decimal', 0);
  });

  test('dec2binary', () => {
    testConversion(12, 'binary', '1100');
    testConversion(0, 'binary', '0');
    testConversion(-12, 'binary', '0');
    testConversion(192, 'binary', '11000000');
  });

  test('bin2bin', () => {
    testConversion('11000000', 'binary', '11000000');
    testConversion('0', 'binary', '0');
  });

  test('bin2dec', () => {
    testConversion('11000000', 'decimal', 192);
    testConversion('0', 'decimal', 0);
  });
});
