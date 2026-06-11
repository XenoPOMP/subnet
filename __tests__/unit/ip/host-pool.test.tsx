import { describe, expect, test } from 'vitest';

import { Address, HostsPool, Network, clampCidrMask } from '@/utils/ip';

describe('HostsPool class', () => {
  testHostsPool([0, 0, 0, 0], 0, {
    firstAddressShouldBe: '0.0.0.1',
    lastAddressShouldBe: '255.255.255.254',
  });

  testHostsPool([0, 0, 0, 0], 1, {
    firstAddressShouldBe: '0.0.0.1',
    lastAddressShouldBe: '127.255.255.254',
  });

  testHostsPool([0, 0, 0, 0], 2, {
    firstAddressShouldBe: '0.0.0.1',
    lastAddressShouldBe: '63.255.255.254',
  });

  testHostsPool([192, 168, 25, 0], 24, {
    firstAddressShouldBe: '192.168.25.1',
    lastAddressShouldBe: '192.168.25.254',
  });

  testHostsPool([10, 10, 10, 10], 31, {
    firstAddressShouldBe: '10.10.10.10',
    lastAddressShouldBe: '10.10.10.11',
    countShouldBe: 2,
  });

  testHostsPool([10, 0, 40, 117], 32, {
    firstAddressShouldBe: '10.0.40.117',
    lastAddressShouldBe: '10.0.40.117',
    countShouldBe: 1,
  });
});

// eslint-disable-next-line jsdoc/require-jsdoc
function predictMaskCount(mask: number): number {
  const trueMask: number = clampCidrMask(mask);

  // Special masks
  if (trueMask === 31) return 2;
  if (trueMask === 32) return 1;

  return 2 ** (32 - trueMask) - 2;
}

interface Config {
  firstAddressShouldBe: string;
  lastAddressShouldBe: string;
  countShouldBe?: number;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function testHostsPool(
  octets: [number, number, number, number],
  mask: number,
  {
    firstAddressShouldBe,
    lastAddressShouldBe,
    countShouldBe: optionalCountShouldBe,
  }: Config,
) {
  const address = new Address(...octets);
  const net = new Network(address, mask);
  const pool = new HostsPool(net);
  const expectedCount: number = optionalCountShouldBe ?? predictMaskCount(mask);

  describe(`${address.cidr(mask)}`, () => {
    test(`First host is at ${firstAddressShouldBe}`, () => {
      expect(pool.firstHost.format()).toBe(firstAddressShouldBe);
    });

    test(`Last host is at ${lastAddressShouldBe}`, () => {
      expect(pool.lastHost.format()).toBe(lastAddressShouldBe);
    });

    test(`Pool has to contain ${expectedCount} host(s)`, () => {
      expect(pool.count()).toBe(expectedCount);
    });
  });
}
