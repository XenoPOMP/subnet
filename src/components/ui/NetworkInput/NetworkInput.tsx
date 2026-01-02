'use client';

import cn from 'classnames';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { VariableFC } from 'xenopomp-essentials';

import { VStack } from '@/components/ui';
import { InputField } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import { Address, Network } from '@/utils/ip';

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
    defaultValues: {
      address: '',
    },
  });

  const addr = form.watch('address');

  const network = useMemo(() => {
    if (form.formState.errors.address) {
      return null;
    }
    const [ip, mask] = addr.split('/');
    const [oct1, oct2, oct3, oct4] = ip!.split('.');

    const ipAddress = new Address(+oct1!, +oct2!, +oct3!, +oct4!);
    return new Network(ipAddress, +mask!);
  }, [form.formState.errors.address, addr]);

  const networkDisplay = useMemo(() => {
    if (!network) return '';

    const lhs = network.address.format();
    const rhs = network.broadcast.format();
    const mask = network.mask;

    return `${lhs}/${mask} - ${rhs}/${mask}`;
  }, [network]);

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
          // eslint-disable-next-line jsdoc/require-jsdoc
          validate: value => {
            // eslint-disable-next-line regexp/no-unused-capturing-group,regexp/no-super-linear-backtracking,regexp/no-misleading-capturing-group
            if (!/^(\d+.?)+\/\d+$/.test(value)) {
              return t.errors.net.wrongFormat;
            }

            const match = /\d+$/.exec(value);
            if (match === null && match?.[0] === undefined)
              return t.errors.net.wrongMask;
            if (+match![0] < 1 || +match![0] > 31)
              return t.errors.net.wrongMask;

            return true;
          },
        })}
        {...props}
      />

      {form.formState.errors.address && (
        <p>{form.formState.errors.address.message}</p>
      )}

      {!form.formState.errors.address && <p>{networkDisplay}</p>}
    </VStack>
  );
};
