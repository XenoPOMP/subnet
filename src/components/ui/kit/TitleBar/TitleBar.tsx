import cn from 'classnames';
import type { VariableFC } from 'xenopomp-essentials';

import { HStack, Spacer } from '@/components/ui';
import { Logo } from '@/components/ui/kit';

// TODO ⬇️ Implement DropdownMenu component
// TODO 🔤 Add language selection to TitleBar using DropdownMenu component.
// TODO 🎨 Add theme switching
// eslint-disable-next-line jsdoc/require-jsdoc
export const TitleBar: VariableFC<'header', unknown> = ({
  className,
  children,
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
          'px-[1.6rem] py-[0.8rem]',
          'border-b-[1px] border-b-divider',
          'select-none',
          className,
        )}
        {...props}
      >
        <Logo href='/' />
        <Spacer />
        {children}
      </header>
    </HStack>
  );
};
