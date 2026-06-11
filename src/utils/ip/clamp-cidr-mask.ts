import { clamp } from 'motion';

/**
 * Convert any string value to allowed CIDR mask definition.
 *
 * @example
 * clampCidrMask(-1) // => 0
 * clampCidrMask(12) // => 12
 * clampCidrMask(32) // => 32
 * clampCidrMask(100) // => 32
 */
export function clampCidrMask(maskValue: number): number;

/**
 * Convert any string value to allowed CIDR mask definition.
 *
 * If function fails to parse integer value, it fallbacks to 0.
 *
 * @example
 * clampCidrMask('not a number') // => 0
 * clampCidrMask('-1') // => 0
 * clampCidrMask('12') // => 12
 * clampCidrMask('32') // => 32
 * clampCidrMask('100') // => 32
 */
export function clampCidrMask(maskValue: string): number;

export function clampCidrMask(maskValue: number | string): number;

// eslint-disable-next-line jsdoc/require-jsdoc
export function clampCidrMask(maskValue: number | string): number {
  const trueValue: number = Number.isInteger(+maskValue) ? +maskValue : 0;
  return clamp(0, 32, trueValue);
}
