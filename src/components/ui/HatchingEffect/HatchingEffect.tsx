import cn from 'classnames';
import type { VariableProps } from 'xenopomp-essentials';

import { slotable } from '@/components/hoc';
import type { HTMLColor } from '@/types';

interface Props {
  lineWidth?: string;
  gapRatio?: number;
  tint: HTMLColor;
  backgroundTint?: HTMLColor;
}

export const HatchingEffect = slotable<'div', VariableProps<'div', Props>>(
  'div',
  ({
    Comp,
    className,
    children,
    style,
    lineWidth = '1px',
    gapRatio = 3,
    tint,
    backgroundTint = 'transparent',
    ...props
  }) => (
    <Comp
      className={cn(className)}
      style={{
        // Setting up the variables.
        '--hatch-line-width': lineWidth,
        '--hatch-line-gap': `calc(var(--hatch-line-width) * ${gapRatio})`,
        '--hatch-tint-color': tint,
        '--hatch-bg-tint-color': backgroundTint,

        // User-defined style overwrites.
        ...style,
      }}
      {...props}
    >
      {children}
    </Comp>
  ),
);
