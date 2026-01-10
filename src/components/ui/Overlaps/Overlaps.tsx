import cn from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useCallback } from 'react';

import { For } from '@/components/layout';
import { HatchingEffect, ZStack } from '@/components/ui';
import { useOverlaps } from '@/hooks';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export const Overlaps: FC<unknown> = () => {
  const { root } = useNetworkStore();
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

        className: cn(
          'h-full',
          'z-[10]',
          'border-[1px] border-overlap',
          'opacity-50',
        ),
        tint: 'rgba(var(--colors-overlap))',
        backgroundTint: 'var(--colors-overlap-bg)',
      };
    },
    [min, max],
  );

  return (
    <ZStack className={cn('size-[100%]')}>
      <div className={cn('size-[100%]')}></div>

      <For each={overlaps}>
        {overlap => (
          <HatchingEffect
            key={`overlap-start-${overlap[0]}-end-${overlap[1]}`}
            {...calculateMeasurements(overlap)}
          />
        )}
      </For>
    </ZStack>
  );
};
