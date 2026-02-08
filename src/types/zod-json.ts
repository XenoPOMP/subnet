import type { Jsonify } from 'type-fest';
import type { AnyObject } from 'xenopomp-essentials';
import type { ZodNumber, ZodOptional, ZodString } from 'zod';

export type ZodJson<T> = {
  [K in keyof Jsonify<T>]: Jsonify<T>[K] extends AnyObject
    ? ZodJson<Jsonify<T>[K]>
    : Jsonify<T>[K] extends string
      ? ZodString
      : Jsonify<T>[K] extends string | undefined
        ? ZodOptional<ZodString>
        : Jsonify<T>[K] extends number
          ? ZodNumber
          : Jsonify<T>[K] extends number | undefined
            ? ZodOptional<ZodNumber>
            : never;
};
