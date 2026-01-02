import { CustomError } from 'ts-custom-error';

import type { BaseNumberType } from '@/utils/base-number/types';

export class NumberCreationError extends CustomError {
  public constructor(type: BaseNumberType) {
    super(`Error creating '${type}' number.`);
  }
}
