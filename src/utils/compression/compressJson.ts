import LZString from 'lz-string';

/**
 * Serializes value into URI-safe compressed string. This is the inverse of
 * what `decompressRootNetwork` and `decompessSubnets` expect as input.
 * @param value
 */
export const compressJson = (value: unknown): string =>
  LZString.compressToEncodedURIComponent(JSON.stringify(value));
