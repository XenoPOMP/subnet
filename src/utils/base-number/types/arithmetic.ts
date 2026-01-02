import type { AnyBaseNumber } from '../types';

type RhsFunction = (value: AnyBaseNumber) => any;

export interface Addable {
  plus: RhsFunction;
}

export interface Minusable {
  minus: RhsFunction;
}

export type Arithmetic = Addable & Minusable;
