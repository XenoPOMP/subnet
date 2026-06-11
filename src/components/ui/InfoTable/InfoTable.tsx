import cn from 'classnames';
import type { FC } from 'react';
import { Fragment } from 'react';

import { For } from '@/components/layout';
import { VStack } from '@/components/ui';

import type { InfoTableProps } from './InfoTable.props';

// eslint-disable-next-line jsdoc/require-jsdoc
export const InfoTable: FC<InfoTableProps> = ({ title, content }) => {
  return (
    <VStack
      spacing='1.0rem'
      className={cn('select-none', 'w-full')}
      asChild
    >
      <article>
        <h4
          className={cn(
            'text-[1.6rem] font-bold uppercase',
            'tracking-[0.08rem]',
            'text-logo-main',
          )}
        >
          {title}
        </h4>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            gap: '0.8rem',
          }}
          className={cn(
            'w-full text-[1.4rem]',
            '[&>p]:size-full [&>p]:text-left',
          )}
        >
          <For each={content}>
            {([title, item]) => (
              <Fragment key={`${title}-${item}`}>
                {!!title ? (
                  <>
                    <p className={cn('text-shallow')}>{title}</p>
                    <p className={cn('select-text text-primary-font')}>
                      {item}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className={cn('select-text text-primary-font')}
                      style={{
                        gridColumn: 'span 2',
                      }}
                    >
                      {item}
                    </p>
                  </>
                )}
              </Fragment>
            )}
          </For>
        </section>
      </article>
    </VStack>
  );
};
