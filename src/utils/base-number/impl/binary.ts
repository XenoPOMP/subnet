import { NumberCreationError } from '@/errors';

import { BaseNumber } from '../impl/base-number';
import { Decimal } from '../impl/decimal';
import type { Convertible } from '../types';

/** Safely create binary numbers. */
export const binary = (value: string) => {
  try {
    return new Binary(value);
  } catch {
    return null;
  }
};

export class Binary
  extends BaseNumber<string, 'binary'>
  implements Convertible
{
  constructor(value: string) {
    const illegalChars: boolean = !value
      .split('')
      .every(c => c === '1' || c === '0');

    if (illegalChars) {
      throw new NumberCreationError('binary');
    }

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
