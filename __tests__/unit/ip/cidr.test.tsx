import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

describe('CIDR interface', () => {
  test('Address correctly implements it', () => {
    const ip = new Address(192, 168, 0, 0);
    const cidr = ip.cidr(24);

    expect(cidr).toEqual('192.168.0.0/24');
  });

  test('Network correctly implements it', () => {
    const ip = new Address(192, 168, 0, 0);
    const network = new Network(ip, 24);

    expect(network.cidr({ showRange: false })).toEqual('192.168.0.0/24');
    expect(network.cidr({ showRange: true })).toEqual(
      '192.168.0.0/24 - 192.168.0.255/24',
    );
  });
});
