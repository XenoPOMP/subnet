import cn from 'classnames';
import { useMemo } from 'react';
import type { VariableFC } from 'xenopomp-essentials';
import { parseVersion } from 'xenopomp-essentials';

import packageJsonFile from '~/package.json';

import { HStack, Spacer } from '@/components/ui';
import { Logo } from '@/components/ui/kit';

// eslint-disable-next-line jsdoc/require-jsdoc
export const TitleBar: VariableFC<'header', unknown, 'children'> = ({
  className,
  ...props
}) => {
  const parsedVersion = parseVersion(packageJsonFile.version);
  const versionDisplay = useMemo((): string => {
    const { version, preid, prerelease } = parsedVersion;

    // v0.0.0-beta.12
    if (!!version && !!preid && !!prerelease) {
      return ``;
    }

    if (!!version) {
      // v0.0.0
      return `v${version}`;
    }

    return '';
  }, [parsedVersion]);

  return (
    <HStack
      asChild
      alignment='leading'
    >
      <header
        className={cn(
          'h-[--dashboard-header-height]',
          'px-[1.6rem] py-[0.8rem]',
          'border-b-[1px] border-b-divider',
          'select-none',
          className,
        )}
        {...props}
      >
        <Logo />
        <Spacer />
        <span className={cn('text-[1.4rem] text-shallow')}>
          {versionDisplay}
        </span>
      </header>
    </HStack>
  );
};
