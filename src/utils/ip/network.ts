import { clamp } from 'motion';

import type { CIDR, Equatable } from '@/types';
import { Address } from '@/utils/ip';

export class Network implements CIDR, Equatable {
  readonly address: Address;
  readonly broadcast: Address;
  readonly mask: number;

  name: string | undefined;
  color: string | undefined;

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

  cidr(options?: NetworkCIDROptions): string {
    const showRanges: boolean = options?.showRange ?? false;

    // Show only address of whole network
    const addressCIDR = this.address.cidr(this.mask);
    if (!showRanges) return this.address.cidr(this.mask);
    // Showing broadcast as well
    const broadcastCIDR = this.broadcast.cidr(this.mask);
    return `${addressCIDR} - ${broadcastCIDR}`;
  }

  // Calculates wildcard pattern for this network
  wildcard(): Address {
    const bitmap = `${'0'.repeat(this.mask)}`.padEnd(32, '1');
    return Address.fromBitmap(bitmap);
  }

  equals(rhs: Network): boolean {
    const addressesAreSame = this.address.equals(rhs.address);
    const broadcastestAreSame = this.broadcast.equals(rhs.broadcast);
    const masksAreSame = this.mask === rhs.mask;

    return addressesAreSame && broadcastestAreSame && masksAreSame;
  }

  private firstNChars(value: string, n: number): string {
    return value.substring(0, n);
  }
}

interface NetworkCIDROptions {
  /**
   * If true, will show broadcast address as well.
   *
   * @default false
   * @example
   * network.cidr({
   *   showRange: true
   * }); // 192.168.0.0/24 - 192.168.0.255/24
   */
  showRange?: boolean;
}
