import cn from 'classnames';
import { useMemo } from 'react';
import type { VariableProps } from 'xenopomp-essentials';

import { slotable } from '@/components/hoc';

import type { MediaRenderedProps } from './MediaRendered.props';

export const MediaRendered = slotable<'div', Props>(
  'div',
  ({
    Comp,
    className,
    children,
    screen,
    relativeScreenDetection,
    ...props
  }) => {
    const media = useMemo(() => {
      return {
        [`${screen}:hidden`]: relativeScreenDetection === 'before',
        [`max-${screen}:hidden`]: relativeScreenDetection === 'after',
      };
    }, [screen, relativeScreenDetection]);

    return (
      <Comp
        className={cn(media, className)}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

type Props = VariableProps<'div', MediaRenderedProps>;
