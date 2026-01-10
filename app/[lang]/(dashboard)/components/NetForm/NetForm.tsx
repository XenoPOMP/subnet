'use client';

import cn from 'classnames';
import { Plus } from 'lucide-react';

import { For } from '@/components/layout';
import { NetworkInput } from '@/components/ui';
import { Button, Heading } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import { useNetworkStore } from '@/zustand';

import styles from './NetForm.module.scss';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetForm() {
  const { t } = useTranslations();
  const { createSubnet, subnets } = useNetworkStore();

  return (
    <aside className={cn(styles.form)}>
      <section className={cn(styles.group)}>
        <NetworkInput target='root' />
      </section>

      <section
        className={cn(
          styles.group,
          styles.sticky,
          styles.alwaysBorder,
          'flex items-center justify-between',
        )}
      >
        <Heading
          level={2}
          className={cn('select-none')}
        >
          {t.pages.dashboard.headings.subnets}
        </Heading>

        <Button
          square
          leadingIcon={Plus}
          onClick={() => createSubnet()}
        />
      </section>

      <For each={subnets}>
        {({ network, id }) => (
          <section className={cn(styles.group)}>
            <NetworkInput target={id} />
          </section>
        )}
      </For>
    </aside>
  );
}
