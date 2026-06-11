import { beforeEach, describe, expect, test, vi } from 'vitest';

import { prettyInt } from '@/utils/pretty';

describe('prettyInt', () => {
  testPrettyInt('ru-RU');
  testPrettyInt('en-US');
});

// eslint-disable-next-line jsdoc/require-jsdoc
function testPrettyInt(loc: string) {
  describe(loc, () => {
    mockLocale(loc);

    test('It makes integer values pretty', () => {
      expect(prettyInt(12900)).toBe('12 900');
    });

    test('It makes float values pretty', () => {
      expect(prettyInt(12900.801)).toBe('12 900');
    });

    test('It makes string values pretty', () => {
      expect(prettyInt('12900')).toBe('12 900');
      expect(prettyInt('12900.801')).toBe('12 900');
    });
  });
}

// eslint-disable-next-line jsdoc/require-jsdoc
function mockLocale(loc: string) {
  beforeEach(() => {
    // Spy on Intl.DateTimeFormat to override system locale and timezone
    vi.spyOn(global.Intl, 'DateTimeFormat').mockImplementation(
      (locales, options) => {
        return new Intl.DateTimeFormat(loc, {
          ...options,
          timeZone: 'UTC', // Lock in UTC to avoid timezone drift
        });
      },
    );
  });
}
