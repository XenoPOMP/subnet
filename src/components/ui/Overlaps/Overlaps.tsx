import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useCallback } from 'react';

import { For } from '@/components/layout';
import { ZStack } from '@/components/ui';
import { useOverlaps } from '@/hooks';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export const Overlaps: FC<unknown> = () => {
  const { root, subnets } = useNetworkStore();
  const overlaps = useOverlaps();

  const min = root!.address.asFullDecimal();
  const max = root!.broadcast.asFullDecimal();

  const calculateMeasurements = useCallback(
    ([from, to]: [number, number]): ComponentProps<'div'> => {
      const start = Math.max(from, min);
      const end = Math.min(to, max);
      const progress = ((end - start) / (max - min)) * 100;
      const left = ((start - min) / (max - min)) * 100;

      // TODO Implement hatching
      return {
        className: cn('h-full bg-red-500/10'),
        style: {
          width: `${progress}%`,
          left: `${left}%`,
        },
      };
    },
    [min, max],
  );

  return (
    <ZStack className={cn('size-[100%]')}>
      <div className={cn('size-[100%]')}></div>

      <For each={overlaps}>
        {overlap => <div {...calculateMeasurements(overlap)}></div>}
      </For>
    </ZStack>
  );
};
