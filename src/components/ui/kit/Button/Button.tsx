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
  ...props
}) => (
  <Field asChild>
    <button
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  </Field>
);
