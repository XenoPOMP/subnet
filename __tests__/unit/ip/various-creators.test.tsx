import { describe, expect, test } from 'vitest';

import { decimal } from '@/utils/base-number';
import { Address } from '@/utils/ip';

describe('Create Address instance', () => {
  // eslint-disable-next-line jsdoc/require-jsdoc
  const createBitmapOctets = (
    oc1: number,
    oc2: number,
    oc3: number,
    oc4: number,
  ) => {
    const oct1 = decimal(oc1).binary().value.padStart(8, '0');
    const oct2 = decimal(oc2).binary().value.padStart(8, '0');
    const oct3 = decimal(oc3).binary().value.padStart(8, '0');
    const oct4 = decimal(oc4).binary().value.padStart(8, '0');
    return [oct1, oct2, oct3, oct4];
  };

  test('From bitmap', () => {
    const [oct1, oct2, oct3, oct4] = createBitmapOctets(192, 168, 0, 1);
    const bitmap = `${oct1}${oct2}${oct3}${oct4}`;
    const addr = Address.fromBitmap(bitmap);

    expect(addr.format()).toBe('192.168.0.1');

    expect(
      addr.format({
        delimiters: false,
      }),
    ).toBe('3232235521');

    expect(
      addr.format({
        grade: 'binary',
      }),
    ).toBe('11000000.10101000.00000000.00000001');

    expect(
      addr.format({
        delimiters: false,
        grade: 'binary',
      }),
    ).toBe('11000000101010000000000000000001');
  });

  test('From bitmap (mask)', () => {
    const [oct1, oct2, oct3, oct4] = createBitmapOctets(255, 255, 255, 0);
    const bitmap = `${oct1}${oct2}${oct3}${oct4}`;
    const addr = Address.fromBitmap(bitmap);

    expect(addr.format()).toBe('255.255.255.0');
    expect(
      addr.format({
        delimiters: false,
      }),
    ).toBe('4294967040');

    expect(
      addr.format({
        grade: 'binary',
      }),
    ).toBe('11111111.11111111.11111111.00000000');

    expect(
      addr.format({
        grade: 'binary',
        delimiters: false,
      }),
    ).toBe('11111111111111111111111100000000');
  });
});
