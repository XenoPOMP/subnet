'use client';

import cn from 'classnames';

import { HStack, NetMap, VStack } from '@/components/ui';
import { Field, Heading } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';

import type { MobileLayoutProps } from '@app/[lang]/(dashboard)/components';

import styles from './NetMapContainer.module.scss';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMapContainer({ mobile }: Props) {
  const { t } = useTranslations();

  return (
    <VStack
      spacing='2.4rem'
      asChild
    >
      <article
        style={{
          gridArea: 'main',
        }}
        className={cn(
          'overflow-hidden p-[1.6rem]',
          '!bg-primary-bg-brutal',
          styles.netMapContainer,
          {
            [`${styles.mobileLayout}`]: mobile,
          },
        )}
      >
        <HStack
          asChild
          alignment='leading'
        >
          <Heading level={2}>
            {t.pages.dashboard.headings.netMap}
            {/* eslint-disable-next-line style/spaced-comment */}
            {/*TODO Return copy feature.*/}
            {/* eslint-disable-next-line style/spaced-comment */}
            {/*<Spacer />*/}
            {/* eslint-disable-next-line style/spaced-comment */}
            {/*<ShareMapButton />*/}
          </Heading>
        </HStack>

        <Field
          className={cn(
            'h-full max-h-full w-full overflow-auto',
            '!p-[3.2rem]',
          )}
        >
          <NetMap />
        </Field>
      </article>
    </VStack>
  );
}

type Props = MobileLayoutProps;
