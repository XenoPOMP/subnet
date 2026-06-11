/**
 * Formats string as Intl integer.
 *
 * @example
 * prettyInt('9876543.21'); // 9 876 543,21
 */
export function prettyInt(str: string): string;

/**
 * Formats number as Intl integer.
 *
 * @example
 * prettyInt(9876543.21); // 9 876 543,21
 */
export function prettyInt(num: number): string;

/**
 * Formats number or string as Intl integer.
 *
 * @example
 * prettyInt(9876543.21); // 9 876 543,21
 * prettyInt('9876543.21'); // 9 876 543,21
 */
export function prettyInt(value: number | string): string {
  const integer: number = Number.parseInt(value.toString());
  return integer.toLocaleString();
}
