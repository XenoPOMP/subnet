'use client';

import { Link } from 'lucide-react';
import type { FC } from 'react';

import { CopyTextButton } from '@/components/ui/kit';
import { useNetworkLink } from '@/hooks';
import { useTranslations } from '@/i18n';
import { useNetworkStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
export const ShareMapButton: FC<unknown> = () => {
  const { t } = useTranslations();
  const { root, subnets } = useNetworkStore();
  const copyLink = useNetworkLink(root, subnets);

  return (
    <CopyTextButton
      square
      leadingIcon={Link}
      text={copyLink}
      textOnCopy={t.copyTextMessages.shareNetwork.shared}
    >
      {copyLink}
    </CopyTextButton>
  );
};
