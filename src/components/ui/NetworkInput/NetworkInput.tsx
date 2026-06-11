'use client';

import cn from 'classnames';
import { Trash2 } from 'lucide-react';
import randomColor from 'randomcolor';
import { useEffect, useMemo, useState } from 'react';
import type {
  LenientAutocomplete,
  Nullable,
  VariableFC,
} from 'xenopomp-essentials';

import { HStack, InfoTable, Spacer, VStack } from '@/components/ui';
import { Button, ColorPicker, Heading, InputField } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import { Address, HostsPool, Network, clampCidrMask } from '@/utils/ip';
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
    root,
  } = useNetworkStore();
  const [name, setName] = useState('');
  const [color, setColor] = useState<string>(randomColor());

  const addr = form[target]!.input;

  const ipAddress = useMemo((): Nullable<[Address, string | undefined]> => {
    if (form[target]!.error) {
      return null;
    }
    const [rawIp, rawMask] = addr.split('/');

    // Calculate nullish ip and mask
    const ip: string = !(rawIp === undefined || rawIp === '')
      ? rawIp
      : '0.0.0.0';
    const mask =
      rawMask !== undefined && rawMask !== '' && Number.isInteger(+rawMask)
        ? clampCidrMask(+rawMask).toString()
        : '0';

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

  const pool = useMemo((): HostsPool | null => {
    // Null-safety
    if (network === null) {
      return null;
    }
    return new HostsPool(network);
  }, [network]);

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
          <HStack
            alignment='center'
            spacing='1.0rem'
            className={cn('w-full')}
          >
            <ColorPicker
              color={color}
              onChange={col => setColor(col.hex)}
            />

            <InputField
              placeholder={t.placeholders.network.name}
              unstyled
              value={name}
              onChange={e => setName(e.target.value)}
              className={cn('w-full')}
            />

            <Spacer />

            <Button
              variant='danger'
              leadingIcon={Trash2}
              square
              onClick={() => {
                if (target === 'root') return;
                removeSubnet(target);
              }}
            />
          </HStack>
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
              setValue(target, value);
              return;
            }

            const mask = value.split('/').at(1);

            // Check if mask is from 0 to 32
            if (mask && Number.isInteger(+mask) && (+mask < 0 || +mask > 32)) {
              setError(target, t.errors.net.wrongMask);
              setValue(target, value);
              return;
            }

            // User passed subnetwork that is outside of root one
            if (target !== 'root' && root && network?.isOutsideOf(root)) {
              setError(target, t.errors.net.subnetOutsideRoot);
              setValue(target, value);
              return;
            }

            setError(target, undefined);
            setValue(target, value);
          }}
          className={cn('w-full')}
        />
      </VStack>

      {!!pool && !!network && addr !== '' && (
        <VStack spacing='1.6rem'>
          <InfoTable
            title={t.poolInfo.headings.subnet}
            content={[
              [t.poolInfo.labels.network, network.address.format()],
              [t.poolInfo.labels.broadcast, network.broadcast.format()],
              [
                t.poolInfo.labels.mask,
                `/${network.mask}, ${network.getMaskAsAddress().format()}`,
              ],
            ]}
          />

          <InfoTable
            title={t.poolInfo.headings.hosts}
            content={[
              [
                undefined,
                `${pool.firstHost.format()} - ${pool.lastHost.format()}`,
              ],
            ]}
          />
        </VStack>
      )}
    </VStack>
  );
};

interface Props {
  target: LenientAutocomplete<'root'>;
}
