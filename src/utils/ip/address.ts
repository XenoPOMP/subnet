import chunkText from 'chunk-text';
import { clamp } from 'motion';

import type { CIDR, Equatable } from '@/types';
import { anyBaseNumber, binary, decimal } from '@/utils/base-number';
import type { BaseNumberType } from '@/utils/base-number/types';

export class Address implements CIDR, Equatable {
  private readonly oct1: number;
  private readonly oct2: number;
  private readonly oct3: number;
  private readonly oct4: number;

  constructor(oct1: number, oct2: number, oct3: number, oct4: number) {
    this.oct1 = this.octet(oct1);
    this.oct2 = this.octet(oct2);
    this.oct3 = this.octet(oct3);
    this.oct4 = this.octet(oct4);
  }

  cidr(mask: number): string {
    return `${this.format()}/${mask}`;
  }

  equals(rhs: Address): boolean {
    return this.asFullDecimal() === rhs.asFullDecimal();
  }

  format(options?: {
    /** @default 'decimal' */
    grade?: BaseNumberType;
    delimiters?: boolean;
  }): string {
    const grade = options?.grade ?? 'decimal';
    const useDelimiters = options?.delimiters ?? true;

    if (useDelimiters && grade === 'decimal') {
      const oct1 = decimal(this.oct1).decimal().value;
      const oct2 = decimal(this.oct2).decimal().value;
      const oct3 = decimal(this.oct3).decimal().value;
      const oct4 = decimal(this.oct4).decimal().value;
      return `${oct1}.${oct2}.${oct3}.${oct4}`;
    }

    if (useDelimiters && grade === 'binary') {
      const oct1 = decimal(this.oct1).binary().value.padStart(8, '0');
      const oct2 = decimal(this.oct2).binary().value.padStart(8, '0');
      const oct3 = decimal(this.oct3).binary().value.padStart(8, '0');
      const oct4 = decimal(this.oct4).binary().value.padStart(8, '0');
      return `${oct1}.${oct2}.${oct3}.${oct4}`;
    }

    const oct1 = anyBaseNumber(this.oct1).binary().value.padStart(8, '0');
    const oct2 = anyBaseNumber(this.oct2).binary().value.padStart(8, '0');
    const oct3 = anyBaseNumber(this.oct3).binary().value.padStart(8, '0');
    const oct4 = anyBaseNumber(this.oct4).binary().value.padStart(8, '0');
    const bin = binary(`${oct1}${oct2}${oct3}${oct4}`)!;

    return bin[grade]().value.toString();
  }

  /**
   * Alias for .format({ grade: 'decimal', delimiters: false })
   */
  asFullDecimal(): number {
    return +this.format({
      grade: 'decimal',
      delimiters: false,
    });
  }

  static fromBitmap(bitmap: string): Address {
    const bin = binary(bitmap);

    if (bin === null) {
      return new Address(0, 0, 0, 0);
    }

    // IP Address contains exactly 32 bits
    const rawIpBitmap = this.lastNChars(bin.value.padStart(32, '0'), 32);
    const bitChunks = chunkText(rawIpBitmap, 8).map(
      bits => binary(bits)!.decimal().value,
    );

    return new Address(
      bitChunks[0]!,
      bitChunks[1]!,
      bitChunks[2]!,
      bitChunks[3]!,
    );
  }

  private static lastNChars(target: string, n: number) {
    const substringIndex = Math.max(0, target.length - n);
    return target.substring(substringIndex);
  }

  private octet(value: number) {
    return clamp(0, 255, value);
  }
}
