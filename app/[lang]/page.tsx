'use client';

import cn from 'classnames';

import { For } from '@/components/layout';
import { HStack, NetMap, NetworkInput, VStack } from '@/components/ui';
import { useTranslations } from '@/i18n';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function TestPage() {
  const { t } = useTranslations();
  const { subnets, createSubnet } = useNetworkStore();

  return (
    <HStack
      alignment='topLeading'
      spacing='1.2rem'
      className={cn('h-dvh w-dvw overflow-hidden')}
    >
      <VStack
        alignment='topLeading'
        spacing='1.2rem'
        className={cn('h-full w-1/4 max-w-[400px] overflow-y-auto')}
        asChild
      >
        <aside>
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
        </aside>
      </VStack>

      <VStack
        alignment='topLeading'
        spacing='1.2rem'
        className={cn('min-h-dvh w-full bg-slate-600 p-[1.2rem]')}
      >
        <NetMap />
      </VStack>
    </HStack>
  );
}
