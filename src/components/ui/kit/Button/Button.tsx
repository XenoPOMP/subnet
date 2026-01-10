import cn from 'classnames';
import type { VariableFC } from 'xenopomp-essentials';

import { Field } from '@/components/ui/kit';

import type { ButtonProps } from './Button.props';
import type { ButtonVariantsType } from './Button.variants';
import { buttonVariants } from './Button.variants';

// eslint-disable-next-line jsdoc/require-jsdoc
export const Button: VariableFC<'button', ButtonProps & ButtonVariantsType> = ({
  className,
  children,
  type = 'button',
  variant,
  leadingIcon: LeadingIcon,
  square,
  ...props
}) => (
  <Field asChild>
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, square }),
        'flex items-center justify-start gap-[0.8rem]',
        className,
      )}
      {...props}
    >
      {!!LeadingIcon && (
        <div className={cn('flex-center size-[2.2rem] pb-[0.25rem]')}>
          <LeadingIcon
            size='1.6rem'
            color='currentColor'
          />
        </div>
      )}

      {children}
    </button>
  </Field>
);
