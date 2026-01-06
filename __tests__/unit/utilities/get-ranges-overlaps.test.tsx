import { describe, expect, test } from 'vitest';

import { findOverlappingValues } from '@/utils/misc';

describe('getRangesOverlaps fn', () => {
  test('It works', () => {
    // 0 ================= 10
    //           5 ====================== 15
    //                 8 ======= 12
    //   1 ============= 9
    //   ||||||||||||||||||||||||||
    //   1                       12
    const ranges: [number, number][] = [
      [0, 10],
      [5, 15],
      [8, 12],
      [1, 9],
    ];
    const overlaps = findOverlappingValues(ranges);
    expect(overlaps).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  test('It can handle not connected overlaps', () => {
    // 0 ================= 10
    //           5 ====================== 15 16 17 18 19 20
    //                 8 ======= 12
    //   1 ============= 9
    //                                             18 19
    //   ||||||||||||||||||||||||||                |||||
    //   1                       12                18 19
    const ranges: [number, number][] = [
      [0, 10],
      [5, 20],
      [8, 12],
      [1, 9],
      [18, 19],
    ];
    const overlaps = findOverlappingValues(ranges);
    expect(overlaps).toStrictEqual([
      // eslint-disable-next-line antfu/consistent-list-newline
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 19,
    ]);
  });
});
