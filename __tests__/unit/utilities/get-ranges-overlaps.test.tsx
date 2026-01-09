import { describe, expect, test } from 'vitest';

import { findOverlappingRanges } from '@/utils/misc';

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
    const overlaps = findOverlappingRanges(ranges);
    expect(overlaps).toStrictEqual([[1, 12]]);
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
    const overlaps = findOverlappingRanges(ranges);
    expect(overlaps).toStrictEqual([
      [1, 12],
      [18, 19],
    ]);
  });
});
