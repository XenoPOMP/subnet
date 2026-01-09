import cn from 'classnames';
import type { VariableProps } from 'xenopomp-essentials';

import { slotable } from '@/components/hoc';
import type { HTMLColor } from '@/types';

import styles from './HatchingEffect.module.scss';

interface Props {
  lineWidth?: string;
  lineGap?: string;
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
    lineWidth = '2px',
    lineGap = '10px',
    tint,
    backgroundTint = 'transparent',
    ...props
  }) => (
    <Comp
      className={cn(className, styles.effect)}
      style={{
        // Setting up the variables.
        '--hatch-line-width': lineWidth,
        '--hatch-line-gap': lineGap,
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
