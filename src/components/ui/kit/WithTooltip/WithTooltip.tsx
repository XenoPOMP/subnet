'use client';

import cn from 'classnames';
import type { ComponentProps, ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import type { VariableFC } from 'xenopomp-essentials';

export const WithTooltip: VariableFC<
  'div',
  {
    id: string;
    tooltip: ReactNode;
  } & Pick<ComponentProps<typeof Tooltip>, 'place'>,
  'id'
  // eslint-disable-next-line jsdoc/require-jsdoc
> = ({ className, children, id, tooltip: tooltipContent, place, ...props }) => {
  return (
    <>
      <div
        id={id}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>

      <Tooltip
        anchorSelect={`#${id}`}
        clickable
        place={place}
        className={cn(
          '!bg-input-bg !text-primary-font',
          'outline outline-1 outline-divider',
        )}
        noArrow
      >
        {tooltipContent}
      </Tooltip>
    </>
  );
};
