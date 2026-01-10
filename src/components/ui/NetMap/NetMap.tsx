'use client';

import cn from 'classnames';

import { For } from '@/components/layout';
import { NetSlider, Overlaps, VStack, ZStack } from '@/components/ui';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMap() {
  const { root, subnets } = useNetworkStore();

  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  return (
    <>
      {!!root && !!min && !!max && (
        <VStack className={cn('w-full')}>
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
    </>
  );
}
