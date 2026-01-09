'use client';

import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type {
  LenientAutocomplete,
  Nullable,
  VariableFC,
} from 'xenopomp-essentials';

import { VStack } from '@/components/ui';
import { InputField } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import { Address, Network } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

/**
 */
export const NetworkInput: VariableFC<
  typeof InputField,
  { target: LenientAutocomplete<'root'> },
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
> = ({ className, target, ...props }) => {
  const { t } = useTranslations();
  const { updateRootNetwork, updateSubnet } = useNetworkStore();

  const form = useForm<{
    address: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      address: '',
    },
  });

  const addr = form.watch('address');

  const ipAddress = useMemo((): Nullable<[Address, string | undefined]> => {
    if (form.formState.errors.address) {
      return null;
    }
    const [ip, mask] = addr.split('/');
    const [oct1, oct2, oct3, oct4] = ip!.split('.');

    const ipAddress = new Address(+oct1!, +oct2!, +oct3!, +oct4!);
    return [ipAddress, mask];
  }, [addr, form.formState.errors.address]);

  const network = useMemo(() => {
    if (!ipAddress) return null;
    const [ip, mask] = ipAddress;
    return new Network(ip, +mask!);
  }, [ipAddress]);

  useEffect(() => {
    if (!network) return;

    if (target === 'root') {
      updateRootNetwork(network);
      return;
    }

    updateSubnet(target, network);
  }, [network]);

  return (
    <VStack
      alignment='topLeading'
      spacing='0.8rem'
      className={cn('rounded-[0.8rem] bg-gray-500 p-[1.6rem]')}
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

      {!form.formState.errors.address && !!network && (
        <p className={cn('text-lg')}>{network.cidr({ showRange: true })}</p>
      )}
    </VStack>
  );
};
