import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

const testData = Array.from({ length: 31 }).map((_, idx) => ({
  value: idx + 1,
}));

describe('Convert CIDR mask to address', () => {
  test.each(testData)('Test 192.168.0.1/$value', ({ value }) => {
    const net = new Network(new Address(192, 168, 0, 1), value);
    const mask: Address = net.getMaskAsAddress();
    const bitmap = `${'1'.repeat(value)}${'0'.repeat(32 - value)}`;
    const expectedAddress: Address = Address.fromBitmap(bitmap);

    // Checking if bitmap is correct
    expect(
      mask.format({
        grade: 'binary',
        delimiters: false,
      }),
    ).toEqual(bitmap);
    // Mask should be the same as generated from bitmap.
    expect(mask.equals(expectedAddress)).toEqual(true);
  });
});
