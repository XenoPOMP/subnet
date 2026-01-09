'use client';

import { Chrome } from '@uiw/react-color';
import cn from 'classnames';
import randomColor from 'randomcolor';
import { useEffect, useMemo, useState } from 'react';
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

// eslint-disable-next-line jsdoc/require-jsdoc
export const NetworkInput: VariableFC<'div', Props, 'children'> = ({
  className,
  target,
  ...props
}) => {
  const { t } = useTranslations();
  const { updateRootNetwork, updateSubnet, form, setValue } = useNetworkStore();
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
  }, [network]);

  return (
    <VStack
      alignment='topLeading'
      spacing='0.8rem'
      className={cn(
        'rounded-[0.8rem] bg-gray-500 p-[1.6rem]',
        'w-full',
        className,
      )}
      {...props}
    >
      {target !== 'root' && (
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
        onChange={e => setValue(target, e.target.value)}
      />

      {form[target]!.error && <p>{form[target]!.error}</p>}

      {!form[target]?.error && !!network && (
        <p className={cn('text-lg')}>{network.cidr({ showRange: true })}</p>
      )}
    </VStack>
  );
};

interface Props {
  target: LenientAutocomplete<'root'>;
}
