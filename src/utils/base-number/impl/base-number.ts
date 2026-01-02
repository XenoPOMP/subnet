import { NotImplementedError } from '@/errors';

import type { Binary, Decimal } from '../impl';
import type {
  AbstractNumber,
  AnyBaseNumber,
  Arithmetic,
  BaseNumberType,
  Convertible,
  NumberDataMap,
} from '../types';

/**
 * > This class is not meant to be used as standalone class.
 * > Use it`s inheritors instead!
 */
export class BaseNumber<T, Base extends BaseNumberType>
  implements AbstractNumber<T>, Convertible, Arithmetic
{
  public readonly value: T;
  private transformKey: BaseNumberType;

  constructor(value: T, transformKey: BaseNumberType) {
    this.value = value;
    this.transformKey = transformKey;
  }

  decimal(): Decimal {
    throw new NotImplementedError('BaseNumber.decimal()');
  }

  binary(): Binary {
    throw new NotImplementedError('BaseNumber.binary()');
  }

  plus(value: AnyBaseNumber): NumberDataMap[Base] {
    return this.performArithmeticOperation(value, ([lhs, rhs]) => lhs + rhs);
  }

  minus(value: AnyBaseNumber): NumberDataMap[Base] {
    return this.performArithmeticOperation(value, ([lhs, rhs]) => lhs - rhs);
  }

  private performArithmeticOperation(
    value: AnyBaseNumber,
    operation: ([lhs, rhs]: [number, number]) => number,
  ): NumberDataMap[Base] {
    const lhs = 0;
    const rhs = 0;
    const result = operation([lhs, rhs]);

    // TODO Implement this after implemented inheritance of Decimal and Binary. This should return instance of base number.
    return result;
  }
}
