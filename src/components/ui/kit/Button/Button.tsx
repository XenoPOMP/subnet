import cn from 'classnames';
import type { VariableFC } from 'xenopomp-essentials';

import { Field } from '@/components/ui/kit';

import type { ButtonProps } from './Button.props';

// eslint-disable-next-line jsdoc/require-jsdoc
export const Button: VariableFC<'button', ButtonProps> = ({
  className,
  children,
  type = 'button',
  ...props
}) => (
  <Field asChild>
    <button
      type={type}
      className={cn(className)}
      {...props}
    >
      {children}
    </button>
  </Field>
);
