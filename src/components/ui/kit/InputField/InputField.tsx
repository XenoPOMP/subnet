import { Input } from '@headlessui/react';
import cn from 'classnames';
import type { VariableFC } from 'xenopomp-essentials';

import type { FieldAlikeProps } from '@/components/ui/kit';
import { Field } from '@/components/ui/kit';

/**
 * Wraps Input from headlessui with Field component.
 * @constructor
 */
export const InputField: VariableFC<'input', FieldAlikeProps, 'children'> = ({
  className,
  unstyled,
  ...props
}) => {
  return (
    <Field
      asChild
      unstyled={unstyled}
    >
      <Input
        className={cn(className)}
        {...props}
      />
    </Field>
  );
};
