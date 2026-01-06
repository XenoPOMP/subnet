'use client';

import { Slider } from '@mui/material';
import cn from 'classnames';

import { For } from '@/components/layout';
import { VStack, ZStack } from '@/components/ui';
import { useOverlaps } from '@/hooks/useOverlaps.ts';
import { decimal } from '@/utils/base-number';
import { Address } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMap() {
  const { root, subnets } = useNetworkStore();
  const overlaps = useOverlaps();

  // TODO Implement intersections calculation
  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  return (
    <>
      {!!root && !!min && !!max && (
        <ZStack className={cn('w-full bg-zinc-800 p-[1.6rem]')}>
          <VStack
            className={cn('w-full')}
            spacing='0.8rem'
          >
            <For each={subnets}>
              {({ network, id }) => (
                <Slider
                  min={min}
                  max={max}
                  value={[
                    network.address.asFullDecimal(),
                    network.broadcast.asFullDecimal(),
                  ]}
                  disabled
                  disableSwap
                  className={cn('[&>.MuiSlider-thumb]:size-[0.6rem]')}
                  key={`slider-for-network-${id}`}
                />
              )}
            </For>
          </VStack>
        </ZStack>
      )}

      <For each={overlaps}>
        {([from, to]) => (
          <div key={`range-from-${from}-to-${to}`}>
            <b>{Address.fromBitmap(decimal(from!).binary().value).format()}</b>{' '}
            - <b>{Address.fromBitmap(decimal(to!).binary().value).format()}</b>
          </div>
        )}
      </For>
    </>
  );
}
