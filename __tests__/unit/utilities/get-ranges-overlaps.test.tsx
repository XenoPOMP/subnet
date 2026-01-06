import { describe, expect, test } from 'vitest';

import { getRangesOverlaps } from '@/utils/misc';

describe('getRangesOverlaps fn', () => {
  test('It works', () => {
    // 0 1 2 3 4 5 6 7 8 9 10
    //           5 6 7 8 9 10 11 12 13 14 15
    //                 8 9 10 11 12
    //   1 2 3 4 5 6 7 8 9
    const ranges: [number, number][] = [
      [0, 10],
      [5, 15],
      [8, 12],
      [1, 9],
    ];
    const overlaps = getRangesOverlaps(ranges);
    expect(overlaps).toStrictEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9]]);
  });
});
