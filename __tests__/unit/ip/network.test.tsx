import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

describe('Network class', () => {
  test('It parses mask properly', () => {
    const addr = new Address(255, 255, 255, 50);
    const net = new Network(addr, 24);

    expect(net.address.format()).toBe('255.255.255.0');
    expect(net.broadcast.format()).toBe('255.255.255.255');
  });

  test('Network respects octets', () => {
    const addr = new Address(192, 168, 50, 1); // /19
    const net = new Network(addr, 19);

    expect(net.address.format()).toBe('192.168.32.0');
    expect(net.broadcast.format()).toBe('192.168.63.255');
  });
});
