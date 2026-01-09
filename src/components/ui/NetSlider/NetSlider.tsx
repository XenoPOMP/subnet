import cn from 'classnames';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { FC } from 'react';
import { useMemo } from 'react';

import { VStack } from '@/components/ui';
import { binary, decimal } from '@/utils/base-number';
import type { Network } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

interface Props {
  network: Network;
}

// eslint-disable-next-line jsdoc/require-jsdoc
export const NetSlider: FC<Props> = ({ network }) => {
  const { root } = useNetworkStore();

  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  const step = useMemo((): number => {
    const wildcard = network.wildcard().format({
      grade: 'binary',
      delimiters: false,
    });
    return binary(wildcard)!.decimal().plus(decimal(1)).value;

    // .wildcard() method uses .mask property under the hood.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, network.mask]);

  return (
    <div>
      <Slider
        min={min}
        max={max}
        value={[
          network.address.asFullDecimal(),
          network.broadcast.asFullDecimal(),
        ]}
        // disabled
        // disableSwap
        range={{
          // editable: false,
          draggableTrack: true,
        }}
        className={cn('[&>.MuiSlider-thumb]:size-[0.6rem]', 'z-[20]')}
      />

      <VStack
        spacing='0.8rem'
        className={cn('pt-[1.6rem]')}
      >
        <p>Mask (CIDR): {network.mask}</p>
        <p>Step: {step}</p>
      </VStack>
    </div>
  );
};
