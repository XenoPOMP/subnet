import cn from 'classnames';
import type { VariableFC } from 'xenopomp-essentials';

import type { FieldAlikeProps } from '@/components/ui/kit';
import { Field } from '@/components/ui/kit';

import type { ButtonProps } from './Button.props';
import type { ButtonVariantsType } from './Button.variants';
import { buttonVariants } from './Button.variants';

export const Button: VariableFC<
  'button',
  ButtonProps & ButtonVariantsType & FieldAlikeProps
  // eslint-disable-next-line jsdoc/require-jsdoc
> = ({
  className,
  children,
  type = 'button',
  variant,
  leadingIcon: LeadingIcon,
  square,
  unstyled,
  ...props
}) => (
  <Field
    asChild
    unstyled={unstyled}
  >
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
        <div
          className={cn('flex-center size-[2.2rem]', {
            'pb-[0.25rem]': !square,
          })}
        >
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
