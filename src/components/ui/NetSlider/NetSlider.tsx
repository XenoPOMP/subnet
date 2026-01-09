import cn from 'classnames';
import { clamp } from 'motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { ComponentProps, FC } from 'react';
import { useMemo } from 'react';
import type { RequiredDeep } from 'type-fest';

import { useTranslations } from '@/i18n';
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
  const { t } = useTranslations();

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

    // If network did not changed, do not update app state.
    if (network.equals(newNetwork)) return;

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
      <h2
        className={cn('relative z-[30] flex w-full items-center gap-[0.6rem]')}
      >
        <div
          className={cn('size-[12px] rounded-full')}
          style={{
            background: network.color,
          }}
        ></div>

        {/* eslint-disable-next-line no-extra-boolean-cast */}
        {!!network.name ? network.name : t.placeholders.network.name}

        <div className={cn('text-xl italic !leading-[100%] text-gray-400')}>
          {network.cidr({ showRange: true })}
        </div>
      </h2>

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
        className={cn('z-[20]')}
        classNames={{
          handle: cn(
            '!border-[0px] !opacity-100 !size-[1.0rem] !-mt-[3.5px]',
            '!shadow-none',
          ),
        }}
        styles={{
          track: {
            backgroundColor: network.color,
          },
          handle: {
            backgroundColor: network.color,
          },
        }}
      />
    </div>
  );
};
