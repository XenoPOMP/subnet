import cn from 'classnames';
import { useForm } from 'react-hook-form';
import type { VariableFC } from 'xenopomp-essentials';

import { VStack } from '@/components/ui';
import { InputField } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';

/**
 * @param className
 * @param props
 * @constructor
 */
export const NetworkInput: VariableFC<
  typeof InputField,
  unknown,
  | 'onChange'
  | 'onBlur'
  | 'ref'
  | 'name'
  | 'min'
  | 'max'
  | 'maxLength'
  | 'minLength'
  | 'pattern'
  | 'required'
  | 'disabled'
  | 'placeholder'
> = ({ className, ...props }) => {
  const { t } = useTranslations();

  const form = useForm<{
    address: string;
  }>({
    mode: 'onChange',
  });

  return (
    <VStack
      alignment='topLeading'
      spacing='0.8rem'
    >
      <InputField
        className={cn(className)}
        placeholder='192.168.0.1/24'
        {...form.register('address', {
          required: t.errors.required,
          pattern: {
            // eslint-disable-next-line regexp/no-super-linear-backtracking,regexp/no-misleading-capturing-group
            value: /^(\d+.?)+\/\d{1,2}$/,
            message: t.errors.net.wrongFormat,
          },
        })}
        {...props}
      />

      {form.formState.errors.address && (
        <p>{form.formState.errors.address.message}</p>
      )}
    </VStack>
  );
};
