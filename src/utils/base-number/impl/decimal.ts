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
    let val = this.value;
    // Do not handle negative numbers
    if (val <= 0) return new Binary('0');

    const dividers = this.getBitDividers(val);
    const bitmap: string[] = [];

    dividers.forEach(div => {
      if (val >= div) {
        bitmap.push('1');
        val -= div;
      } else {
        bitmap.push('0');
      }
    });

    return new Binary(bitmap.join(''));
  }

  private getBitDividers(num: number) {
    const dividers: number[] = [];
    let pow = this.neareastPow2(num);

    while (pow >= 1) {
      dividers.push(pow);
      pow /= 2;
    }

    return dividers.sort((a, b) => b - a);
  }

  private neareastPow2(num: number) {
    const target = Math.max(0, num);
    if (target <= 0) return 1;
    // Calculate the logarithm base 2 of the number
    const exponent = Math.log(num) / Math.log(2);
    // Round the exponent to the nearest integer
    const roundedExponent = Math.floor(exponent);
    // Raise 2 to the rounded exponent
    return 2 ** roundedExponent;
  }
}
