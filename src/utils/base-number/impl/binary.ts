import { BaseNumber, Decimal } from '../impl';
import type { Convertible } from '../types';

export class Binary
  extends BaseNumber<string, 'binary'>
  implements Convertible
{
  constructor(value: string) {
    // TODO Add validation here
    super(value, 'binary');
  }

  decimal(): Decimal {
    // TODO Implement conversion to decimal
    const res = 12;
    return new Decimal(res);
  }

  binary(): Binary {
    return new Binary(this.value);
  }
}
