'use client';

import { Chrome } from '@uiw/react-color';
import cn from 'classnames';
import { CircleX, NetworkIcon } from 'lucide-react';
import randomColor from 'randomcolor';
import { useEffect, useMemo, useState } from 'react';
import type {
  LenientAutocomplete,
  Nullable,
  VariableFC,
} from 'xenopomp-essentials';

import { VStack } from '@/components/ui';
import { Heading, InputField, Label } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import { Address, Network } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export const NetworkInput: VariableFC<'div', Props, 'children'> = ({
  className,
  target,
  ...props
}) => {
  const { t } = useTranslations();
  const {
    updateRootNetwork,
    updateSubnet,
    form,
    setValue,
    setError,
    removeSubnet,
  } = useNetworkStore();
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>(randomColor());

  const addr = form[target]!.input;

  const ipAddress = useMemo((): Nullable<[Address, string | undefined]> => {
    if (form[target]!.error) {
      return null;
    }
    const [ip, mask] = addr.split('/');
    const [oct1, oct2, oct3, oct4] = ip!.split('.');

    const ipAddress = new Address(+oct1!, +oct2!, +oct3!, +oct4!);
    return [ipAddress, mask];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addr, form[target]!.error]);

  // Network created from local state.
  const network = useMemo(() => {
    if (!ipAddress) return null;
    const [ip, mask] = ipAddress;
    const net = new Network(ip, +mask!);
    net.name = name;
    net.color = color;

    return net;
  }, [color, ipAddress, name]);

  // Sending local input to app state.
  useEffect(() => {
    if (!network) return;

    if (target === 'root') {
      updateRootNetwork(network);
      return;
    }

    updateSubnet(target, network);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  return (
    <VStack
      alignment='topLeading'
      spacing='2.0rem'
      className={cn('w-full', className)}
      {...props}
    >
      <VStack
        spacing='1.0rem'
        className={cn('w-full select-none')}
      >
        {target === 'root' ? (
          <>
            <Heading level={2}>{t.pages.dashboard.headings.rootNet}</Heading>
          </>
        ) : (
          <>
            <InputField
              placeholder={t.placeholders.network.name}
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <Chrome
              color={color}
              onChange={color => {
                setColor(color.hex);
              }}
            />
          </>
        )}

        <InputField
          placeholder='192.168.0.1/24'
          value={addr}
          onChange={e => {
            // Do the validation here
            const value = e.target.value;

            // eslint-disable-next-line regexp/no-unused-capturing-group,regexp/no-super-linear-backtracking
            if (!/^(\d+\.*){4}\/\d{1,2}$/.test(value)) {
              // String does not follow pattern
              setError(target, t.errors.net.wrongFormat);
            } else {
              setError(target, undefined);
            }

            // Anyway, update the state
            setValue(target, value);
          }}
          className={cn('w-full')}
        />
      </VStack>

      <VStack spacing='1.0rem'>
        {form[target]!.error && (
          <>
            <Label
              icon={CircleX}
              className={cn('!text-danger')}
            >
              {form[target]!.error}
            </Label>
          </>
        )}

        {!form[target]?.error && !!network && (
          <>
            <Label icon={NetworkIcon}>
              {network.cidr({ showRange: true })}
            </Label>
          </>
        )}
      </VStack>

      {target !== 'root' && (
        <>
          <button
            type='button'
            className={cn('text-red-500')}
            onClick={() => {
              if (target === 'root') return;
              removeSubnet(target);
            }}
          >
            Delete
          </button>
        </>
      )}
    </VStack>
  );
};

interface Props {
  target: LenientAutocomplete<'root'>;
}
