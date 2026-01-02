'use client';

import { Slider } from '@mui/material';
import cn from 'classnames';
import { Fragment } from 'react';

import { VStack } from '@/components/ui';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMap() {
  const { root, subnets } = useNetworkStore();

  // TODO Implement intersections calculation
  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  return (
    <VStack
      className={cn('w-full bg-zinc-800 p-[1.6rem]')}
      spacing='0.8rem'
    >
      {subnets.map(({ network }, idx) => (
        <Fragment key={idx}>
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
          />
        </Fragment>
      ))}
    </VStack>
  );
}
