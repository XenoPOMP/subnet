import { describe, expect, test } from 'vitest';

import { PrivateApiError } from '@/errors';
import { BaseNumber } from '@/utils/base-number/impl';

describe('BaseNumber class is not meant to be used standalone', () => {
  describe('Conversions throws', () => {
    const num = new BaseNumber(12, 'decimal');
    testMethod(num, 'decimal');
    testMethod(num, 'binary');
  });
});

// eslint-disable-next-line jsdoc/require-jsdoc
function testMethod(number: BaseNumber<any, any>, method: PrivateMethods) {
  test(`BaseNumber.${method}() is forbidden`, () =>
    expect(() => number.decimal()).toThrow(PrivateApiError));
}

type PrivateMethods = keyof Omit<
  {
    [Key in keyof BaseNumber<any, any> as BaseNumber<
      any,
      any
    >[Key] extends () => any
      ? Key
      : never]: string;
  },
  'value'
>;
