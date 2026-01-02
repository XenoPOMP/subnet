'use client';

import cn from 'classnames';

import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMap() {
  const { root, subnets } = useNetworkStore();

  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  return <div className={cn('w-full bg-zinc-800 p-[1.6rem]')}>Net map</div>;
}
