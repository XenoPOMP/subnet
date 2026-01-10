'use client';

import { Colorful } from '@uiw/react-color';
import cn from 'classnames';
import randomColor from 'randomcolor';
import type { ComponentProps, FC } from 'react';
import { useState } from 'react';

import { WithTooltip } from '@/components/ui/kit';
import { useUniqueId } from '@/hooks';

// eslint-disable-next-line jsdoc/require-jsdoc
export const ColorPicker: FC<Props> = ({ color: stateColor, onChange }) => {
  const [color, setColor] = useState<string>(stateColor ?? randomColor());
  const uuid = useUniqueId(g => `color-picker-${g}`);

  return (
    <WithTooltip
      id={uuid}
      tooltip={
        <>
          <Colorful
            color={color}
            onChange={col => {
              setColor(col.hex);
              onChange?.(col);
            }}
          />
        </>
      }
      place='right'
    >
      <div
        className={cn('size-[1.6rem] rounded-full')}
        style={{
          backgroundColor: color,
        }}
      ></div>
    </WithTooltip>
  );
};

type Props = Pick<ComponentProps<typeof Colorful>, 'onChange'> & {
  color?: string;
};
