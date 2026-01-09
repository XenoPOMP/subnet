import { Slider } from '@mui/material';
import cn from 'classnames';
import type { FC } from 'react';

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

  return (
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
  );
};
