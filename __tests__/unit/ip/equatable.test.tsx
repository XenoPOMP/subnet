import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

describe('Equatable interface implementation', () => {
  test('Address correctly implements interface', () => {
    const ip1 = new Address(192, 168, 0, 1);
    const ip2 = new Address(192, 168, 0, 1);
    const ip3 = new Address(192, 168, 20, 1);

    // Values must be equal
    expect(ip1.equals(ip2)).toEqual(true);
    // Values must be not equal
    expect(ip1.equals(ip3)).toEqual(false);
    expect(ip2.equals(ip3)).toEqual(false);
  });

  test('Network correctly implements interface', () => {
    const ip1 = new Address(192, 168, 0, 1);
    const net1 = new Network(ip1, 30);

    const ip2 = new Address(192, 168, 0, 3);
    const net2 = new Network(ip2, 30);

    const ip3 = new Address(192, 168, 20, 1);
    const net3 = new Network(ip3, 30);

    const ip4 = new Address(192, 168, 0, 0);
    const net4 = new Network(ip4, 27);

    // Values must be equal
    expect(net1.equals(net2)).toEqual(true);
    // Values must be not equal
    expect(net1.equals(net3)).toEqual(false);
    expect(net2.equals(net3)).toEqual(false);
    // Masks also have to be same
    expect(net1.equals(net4)).toEqual(false);
    expect(net2.equals(net4)).toEqual(false);
  });
});
