import { decimal } from '@/utils/base-number';
import type { Network } from '@/utils/ip';
import { Address, clampCidrMask } from '@/utils/ip';

export class HostsPool {
  private readonly network: Network;

  readonly firstHost: Address;
  readonly lastHost: Address;

  constructor(network: Network) {
    this.network = network;

    // Special masks
    if (network.mask === 31) {
      this.firstHost = network.address;
      this.lastHost = network.broadcast;
      return;
    }
    if (network.mask === 32) {
      this.firstHost = this.network.address;
      this.lastHost = this.network.address;
      return;
    }

    this.firstHost = this.manipulateNumericAddress(network.address, a => a + 1);
    this.lastHost = this.manipulateNumericAddress(
      network.broadcast,
      a => a - 1,
    );
  }

  private manipulateNumericAddress(
    address: Address,
    operation: (addr: number) => number,
  ): Address {
    const operated: number = operation(address.asFullDecimal());
    const bitmap = decimal(operated).binary().value;
    return Address.fromBitmap(bitmap);
  }

  // Calculates total count of hosts inside pool.
  count(): number {
    const { mask } = this.network;
    const trueMask: number = clampCidrMask(mask);

    // Special masks
    if (trueMask === 31) return 2;
    if (trueMask === 32) return 1;

    return 2 ** (32 - trueMask) - 2;
  }
}
