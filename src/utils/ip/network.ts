import { clamp } from 'motion';

import { Address } from '@/utils/ip/address.ts';

export class Network {
  readonly address: Address;
  readonly broadcast: Address;
  readonly mask: number;

  constructor(ipAddress: Address, mask: number) {
    const trueMask = clamp(1, 31, mask);
    const bitmap = ipAddress.format({
      grade: 'binary',
      delimiters: false,
    });
    const netAddressBitmap = this.firstNChars(bitmap, trueMask);
    const networkAddress = Address.fromBitmap(netAddressBitmap.padEnd(32, '0'));
    const broadcast = Address.fromBitmap(netAddressBitmap.padEnd(32, '1'));

    this.address = networkAddress;
    this.broadcast = broadcast;
    this.mask = mask;
  }

  // Calculates wildcard pattern for this network
  wildcard(): Address {
    const bitmap = `${'0'.repeat(this.mask)}`.padEnd(32, '1');
    return Address.fromBitmap(bitmap);
  }

  private firstNChars(value: string, n: number): string {
    return value.substring(0, n);
  }
}
