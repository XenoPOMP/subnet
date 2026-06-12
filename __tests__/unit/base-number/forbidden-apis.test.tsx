import { describe, expect, test } from 'vitest';

import { PrivateApiError } from '@/errors';
import { BaseNumber } from '@/utils/base-number/impl';

describe('BaseNumber class is not meant to be used standalone', () => {
  test('Conversions throws', () => {
    const num = new BaseNumber(12, 'decimal');

    expect(() => num.decimal()).toThrow(PrivateApiError);
    expect(() => num.binary()).toThrow(PrivateApiError);
  });
});
