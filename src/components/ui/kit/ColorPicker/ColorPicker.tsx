'use client';

import type { Chrome } from '@uiw/react-color';
import cn from 'classnames';
import randomColor from 'randomcolor';
import type { ComponentProps, FC } from 'react';
import { useState } from 'react';

// eslint-disable-next-line jsdoc/require-jsdoc
export const ColorPicker: FC<Props> = ({ color: stateColor, onChange }) => {
  const [color, setColor] = useState<string>(stateColor ?? randomColor());

  return (
    <div>
      <div
        className={cn('size-[1.6rem] cursor-pointer rounded-full')}
        style={{
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

type Props = Pick<ComponentProps<typeof Chrome>, 'onChange'> & {
  color?: string;
};
