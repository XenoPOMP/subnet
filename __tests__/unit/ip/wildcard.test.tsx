import { describe, expect, test } from 'vitest';

import { decimal } from '@/utils/base-number';
import { Address, Network } from '@/utils/ip';

describe('Network.wildcard()', () => {
  test('It works', () => {
    const ip = new Address(192, 168, 0, 0);
    const net = new Network(ip, 28);
    const wildcard = decimal(net.wildcard().asFullDecimal()).binary().value;
    const nextWildcard = '1'.repeat(
      decimal(net.wildcard().asFullDecimal()).binary().value.length + 1,
    );

    // Run checks
    expect(wildcard).toEqual('1111');
    expect(nextWildcard).toEqual('11111');
  });
});
