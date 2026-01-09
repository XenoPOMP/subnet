import cn from 'classnames';
import type { VariableFC } from 'xenopomp-essentials';

import { HStack, Spacer } from '@/components/ui';

// TODO Add logo here
// TODO Add traffic lights here
// eslint-disable-next-line jsdoc/require-jsdoc
export const TitleBar: VariableFC<'header', unknown, 'children'> = ({
  className,
  ...props
}) => {
  return (
    <HStack
      asChild
      alignment='leading'
    >
      <header
        className={cn(
          'h-[--dashboard-header-height]',
          'p-[1.6rem]',
          // eslint-disable-next-line prettier/prettier
          'border-b-[1px] border-b-divider',
          'select-none',
          className,
        )}
        {...props}
      >
        <p>Traffic lights</p> <Spacer /> <p>Header</p>
      </header>
    </HStack>
  );
};
