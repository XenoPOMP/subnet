import type { Binary, Decimal } from '../impl';

export interface NumberDataMap {
  decimal: Decimal;
  binary: Binary;
}

/** Union type of all handled base numbers. */
export type AnyBaseNumber = NumberDataMap[keyof NumberDataMap];
export type BaseNumberType = keyof NumberDataMap;
