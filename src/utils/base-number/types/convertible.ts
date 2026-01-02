import type { NumberDataMap } from '../types';

type FunctionMap<T> = {
  [K in keyof T]: () => T[K];
};

/** Represents value, that can be converted to some base number. */
export type Convertible = FunctionMap<NumberDataMap>;
