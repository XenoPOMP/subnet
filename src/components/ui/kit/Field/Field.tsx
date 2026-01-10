import cn from 'classnames';
import type { ComponentProps } from 'react';

import { slotable } from '@/components/hoc';

import styles from './Field.module.scss';

/**
 * Global field component. Allows to share styles across all field-like
 * components.
 */
export const Field = slotable<'div', ComponentProps<'div'> & FieldAlikeProps>(
  'div',
  ({ Comp, className, children, unstyled, ...props }) => (
    <Comp
      className={cn(
        // Nullstyles
        'appearance-none text-primary-font placeholder:text-[1.6rem] placeholder:text-shallow',
        'border-[1px] border-divider bg-input-bg',
        'px-[1.2rem] py-[0.8rem]',
        'text-[1.6rem]',
        'focus-visible:border-accent focus-visible:outline-none',
        'transition-colors',
        styles.field,
        {
          [`${styles.unstyled}`]: !!unstyled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  ),
);

export interface FieldAlikeProps {
  unstyled?: boolean;
}
