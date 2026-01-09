import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useCallback } from 'react';

import { For } from '@/components/layout';
import { HatchingEffect, ZStack } from '@/components/ui';
import { useOverlaps } from '@/hooks';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export const Overlaps: FC<unknown> = () => {
  const { root, subnets } = useNetworkStore();
  const overlaps = useOverlaps();

  const min = root!.address.asFullDecimal();
  const max = root!.broadcast.asFullDecimal();

  const calculateMeasurements = useCallback(
    ([from, to]: [number, number]): ComponentProps<typeof HatchingEffect> => {
      const start = Math.max(from, min);
      const end = Math.min(to, max);
      const progress = ((end - start) / (max - min)) * 100;
      const left = ((start - min) / (max - min)) * 100;

      return {
        style: {
          width: `${progress}%`,
          left: `${left}%`,
        },
        lineWidth: '1px',
        lineGap: '5px',
        key: `overlap-start-${from}-end-${to}`,

        // TODO Replace with actual theme color
        className: cn('h-full', 'z-[10]', 'border-[1px] border-[red]'),
        tint: 'red',
        // TODO Make separate color for transparent bg!!!
        backgroundTint: 'rgba(255 0 0 / .15)',
      };
    },
    [min, max],
  );

  return (
    <ZStack className={cn('size-[100%]')}>
      <div className={cn('size-[100%]')}></div>

      <For each={overlaps}>
        {overlap => <HatchingEffect {...calculateMeasurements(overlap)} />}
      </For>
    </ZStack>
  );
};
