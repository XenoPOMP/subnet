import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

describe('Network.wildcard()', () => {
  test('It works', () => {
    const ip = new Address(192, 168, 0, 0);
    const network = new Network(ip, 28);
    const wildcard = network.wildcard().format({
      grade: 'binary',
      delimiters: false,
    });
    const nextWildcard = '1'.repeat(
      wildcard.split('').filter(c => c === '1').length + 1,
    );

    // Run checks
    expect(wildcard).toEqual('1111'.padStart(32, '0'));
    expect(nextWildcard).toEqual('11111');
  });
});
