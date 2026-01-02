import { BaseNumber } from '../impl/base-number';
import { Binary } from '../impl/binary';
import type { Convertible } from '../types';

/** Safely create decimal numbers. */
export const decimal = (value: number) => new Decimal(value);

export class Decimal
  extends BaseNumber<number, 'decimal'>
  implements Convertible
{
  constructor(value: number) {
    super(Math.max(0, value), 'decimal');
  }

  decimal(): Decimal {
    return new Decimal(this.value);
  }

  binary(): Binary {
    // TODO Properly implement bitmap creation
    const bitmap = '0000';
    return new Binary(bitmap);
  }
}
