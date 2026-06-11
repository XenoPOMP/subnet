import { describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';

describe('Special IP addresses', () => {
  describe('/0 mask produces 0.0.0.0/0', () => {
    testSpecialIp([192, 168, 25, 25], 0, {
      addressShouldBe: '0.0.0.0',
      broadcastShouldBe: '255.255.255.255',
      cidrMaskShouldBe: 0,
      maskShouldBe: '0.0.0.0',
    });
  });

  describe('/32 mask point to single address that is whole subnet itself', () => {
    testSpecialIp([10, 40, 20, 117], 32, {
      addressShouldBe: '10.40.20.117',
      broadcastShouldBe: '10.40.20.117',
      cidrMaskShouldBe: 32,
      maskShouldBe: '255.255.255.255',
    });
  });
});

interface Config {
  addressShouldBe: string;
  broadcastShouldBe: string;
  cidrMaskShouldBe: number;
  maskShouldBe: string;
}

// eslint-disable-next-line jsdoc/require-jsdoc
function testSpecialIp(
  octets: [number, number, number, number],
  mask: number,
  {
    addressShouldBe,
    broadcastShouldBe,
    cidrMaskShouldBe,
    maskShouldBe,
  }: Config,
) {
  const address = new Address(...octets);
  const net = new Network(address, mask);

  test(`Address is ${addressShouldBe}`, () => {
    expect(net.address.format()).toBe(addressShouldBe);
  });

  test(`Broadcast is ${broadcastShouldBe}`, () => {
    expect(net.broadcast.format()).toBe(broadcastShouldBe);
  });

  test(`Mask is /${cidrMaskShouldBe} or ${maskShouldBe}`, () => {
    expect(net.mask).toBe(cidrMaskShouldBe);
    expect(net.getMaskAsAddress().format()).toBe(maskShouldBe);
  });
}
