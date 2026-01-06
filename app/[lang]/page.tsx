'use client';

import cn from 'classnames';
import { Fragment } from 'react';

import {
  HStack,
  NetMap,
  NetworkDisplay,
  NetworkInput,
  VStack,
} from '@/components/ui';
import { useIntersections } from '@/hooks';
import { useTranslations } from '@/i18n';
import { decimal } from '@/utils/base-number';
import { Address } from '@/utils/ip';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function TestPage() {
  const { t } = useTranslations();
  const { root, subnets, createSubnet, removeSubnet } = useNetworkStore();
  const intersections = useIntersections();

  return (
    <HStack
      alignment='topLeading'
      spacing='1.2rem'
    >
      <VStack
        alignment='topLeading'
        spacing='1.2rem'
        className={cn('w-[350px]')}
      >
        <h1>{t.hello}</h1>

        <NetworkInput target='root' />

        {subnets.map(n => (
          <Fragment key={n.id}>
            <NetworkInput
              target={n.id}
              key={n.id}
            />
          </Fragment>
        ))}

        <button
          type='button'
          onClick={() => createSubnet()}
        >
          Create Subnet
        </button>
      </VStack>

      <VStack
        alignment='topLeading'
        spacing='1.2rem'
        className={cn('min-h-dvh w-full bg-slate-600 p-[1.2rem]')}
      >
        <NetMap />

        <h2>Root network</h2>
        <NetworkDisplay network={root} />

        {subnets.map(n => (
          <Fragment key={n.id}>
            <div className={cn('bg-gray-800 p-[1.6rem]')}>
              <h3>Subnet #{n.id}</h3>
              <NetworkDisplay network={n.network} />
              <button
                className={cn('text-red-500')}
                onClick={() => removeSubnet(n.id)}
              >
                Remove
              </button>
            </div>
          </Fragment>
        ))}

        <h2>Intersections</h2>

        {intersections.map(value => (
          <Fragment key={`intersection-for-${value}`}>
            <div className={cn('bg-slate-800 p-[1.6rem]')}>
              <p>
                {Address.fromBitmap(decimal(value).binary().value).format()}
              </p>
            </div>
          </Fragment>
        ))}
      </VStack>
    </HStack>
  );
}
