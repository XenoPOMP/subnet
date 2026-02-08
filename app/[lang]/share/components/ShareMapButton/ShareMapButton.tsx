'use client';

import { Link } from 'lucide-react';
import type { FC } from 'react';

import { CopyTextButton } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';

// eslint-disable-next-line jsdoc/require-jsdoc
export const ShareMapButton: FC<unknown> = () => {
  const { t } = useTranslations();

  // TODO Generate proper link
  return (
    <CopyTextButton
      square
      leadingIcon={Link}
      text='copy link'
      textOnCopy={t.copyTextMessages.shareNetwork.shared}
    />
  );
};
