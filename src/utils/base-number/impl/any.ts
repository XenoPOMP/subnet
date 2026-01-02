import { binary } from '@/utils/base-number/impl/binary.ts';
import { decimal } from '@/utils/base-number/impl/decimal.ts';

type Return<T extends number | string> = T extends number
  ? ReturnType<typeof decimal>
  : T extends string
    ? ReturnType<typeof binary>
    : never;

// eslint-disable-next-line jsdoc/require-jsdoc
export const anyBaseNumber = <T extends number | string>(
  value: T,
): Return<T> => {
  if (typeof value === 'string') {
    return binary(value) as Return<T>;
  }
  return decimal(value) as Return<T>;
};
