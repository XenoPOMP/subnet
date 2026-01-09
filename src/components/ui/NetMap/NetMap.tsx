'use client';

import cn from 'classnames';

import { For } from '@/components/layout';
import { NetSlider, Overlaps, VStack, ZStack } from '@/components/ui';
import { useOverlaps } from '@/hooks';
import { decimal } from '@/utils/base-number';
import { Address } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMap() {
  const { root, subnets } = useNetworkStore();
  const overlaps = useOverlaps();

  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  return (
    <>
      {!!root && !!min && !!max && (
        <VStack className={cn('w-full bg-zinc-800 p-[1.6rem]')}>
          <ZStack className={cn('w-full')}>
            <VStack
              className={cn('w-full')}
              spacing='0.8rem'
            >
              <For each={subnets}>
                {({ network, id }) => (
                  <NetSlider
                    network={network}
                    networkId={id}
                    key={`slider-for-network-${id}`}
                  />
                )}
              </For>
            </VStack>

            <Overlaps />
          </ZStack>
        </VStack>
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
