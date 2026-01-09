import cn from 'classnames';
import { clamp } from 'motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { ComponentProps, FC } from 'react';
import { useMemo } from 'react';
import type { RequiredDeep } from 'type-fest';

import { VStack } from '@/components/ui';
import { binary, decimal } from '@/utils/base-number';
import { Address, Network } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

interface Props {
  network: Network;
  networkId: string;
}

// eslint-disable-next-line jsdoc/require-jsdoc
export const NetSlider: FC<Props> = ({ network, networkId }) => {
  const { root, updateSubnet, setValue } = useNetworkStore();

  const min = root?.address.asFullDecimal();
  const max = root?.broadcast.asFullDecimal();

  const onChange: RequiredDeep<
    ComponentProps<typeof Slider>
    // eslint-disable-next-line jsdoc/require-jsdoc
  >['onChange'] = value => {
    const start =
      typeof value === 'number' ? value : value.sort((a, b) => a - b).at(0);

    if (!start) return;
    // We want to min and max values to be defined. Otherwise, root network is null.
    if (!min || !max) return;

    // Extra check to make sure that range is not ignored.
    const newValue = clamp(min, max, start);
    const bitmap = decimal(newValue).binary().value;
    const ip = Address.fromBitmap(bitmap);
    const newNetwork = new Network(ip, network.mask);

    updateSubnet(networkId, newNetwork);
    setValue(networkId, newNetwork.cidr());
  };

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
        disabled={!min || !max}
        step={step}
        range={{
          draggableTrack: true,
        }}
        onChange={onChange}
        className={cn('[&>.MuiSlider-thumb]:size-[0.6rem]', 'z-[20]')}
      />

      <VStack
        spacing='0.8rem'
        className={cn('pt-[1.6rem]')}
      >
        <p>Range: {network.cidr({ showRange: true })}</p>
        <p>Mask (CIDR): {network.mask}</p>
        <p>Step: {step}</p>
      </VStack>
    </div>
  );
};
