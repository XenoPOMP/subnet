import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

describe('Network.isOutsideOf()', () => {
  test('Networks that equal', () => {
    const net1 = createNet([192, 168, 0, 0], 24);
    const net2 = createNet([192, 168, 0, 0], 24);
    expect(net1.isOutsideOf(net2)).toEqual(false);
  });

  test('Network is before', () => {
    const net1 = createNet([192, 168, 0, 0], 30);
    const net2 = createNet([192, 168, 0, 10], 30);
    expect(net1.isOutsideOf(net2)).toEqual(true);
  });

  test('Network is after', () => {
    const net1 = createNet([192, 168, 0, 50], 30);
    const net2 = createNet([192, 168, 0, 10], 30);
    expect(net1.isOutsideOf(net2)).toEqual(true);
  });
});

// eslint-disable-next-line jsdoc/require-jsdoc
function createNet(
  octets: [number, number, number, number],
  mask: number,
): Network {
  const ip = new Address(...octets);
  return new Network(ip, mask);
}
