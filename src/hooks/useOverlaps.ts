'use client';

import { findOverlappingRanges } from '@/utils/misc';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export const useOverlaps = () => {
  const subnets = useNetworkStore(s => s.subnets);

  const ranges = subnets.map<[number, number]>(net => [
    net.network.address.asFullDecimal(),
    net.network.broadcast.asFullDecimal(),
  ]);

  return findOverlappingRanges(ranges);
};
