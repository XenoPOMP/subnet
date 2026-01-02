import { BaseNumber, Binary } from '../impl';
import type { Convertible } from '../types';

export class Decimal
  extends BaseNumber<number, 'decimal'>
  implements Convertible
{
  constructor(value: number) {
    super(value, 'decimal');
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
