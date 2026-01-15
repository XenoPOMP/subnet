'use client';

import cn from 'classnames';

import { NetMap, VStack } from '@/components/ui';
import { Field, Heading } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';

// eslint-disable-next-line jsdoc/require-jsdoc
export function NetMapContainer() {
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
        className={cn('overflow-hidden p-[1.6rem]', '!bg-primary-bg-brutal')}
      >
        <Heading level={2}>{t.pages.dashboard.headings.netMap}</Heading>

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
