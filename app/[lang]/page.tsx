'use client';

import cn from 'classnames';

import { For } from '@/components/layout';
import {
  HStack,
  NetMap,
  NetworkDisplay,
  NetworkInput,
  VStack,
} from '@/components/ui';
import { useTranslations } from '@/i18n';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function TestPage() {
  const { t } = useTranslations();
  const { root, subnets, createSubnet, removeSubnet } = useNetworkStore();

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

        <For each={subnets}>
          {n => (
            <NetworkInput
              key={`net-input-for-${n.id}`}
              target={n.id}
            />
          )}
        </For>

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

        <For each={subnets}>
          {n => (
            <div
              className={cn('bg-gray-800 p-[1.6rem]')}
              key={`subnet-display-${n.id}`}
            >
              <h3>Subnet #{n.id}</h3>
              <NetworkDisplay network={n.network} />
              <button
                type='button'
                className={cn('text-red-500')}
                onClick={() => removeSubnet(n.id)}
              >
                Remove
              </button>
            </div>
          )}
        </For>
      </VStack>
    </HStack>
  );
}
