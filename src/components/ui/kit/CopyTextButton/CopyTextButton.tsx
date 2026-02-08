'use client';

import cn from 'classnames';
import { Check } from 'lucide-react';
import type { VariableFC } from 'xenopomp-essentials';

import { Button } from '@/components/ui/kit';
import { useCopyToClipboard } from '@/hooks';

// eslint-disable-next-line jsdoc/require-jsdoc
export const CopyTextButton: VariableFC<typeof Button, Props> = ({
  className,
  children,
  onClick,
  text,
  leadingIcon,
  ...props
}) => {
  const { copied, copy, isSupported } = useCopyToClipboard();

  // eslint-disable-next-line jsdoc/require-jsdoc
  const doCopy = () => {
    // Do not proceed any unsupported actions
    if (!isSupported()) return;
    // Otherwise, do copy
    copy(text);
  };

  const currentLeadingIcon = copied ? Check : leadingIcon;

  const currentChildren =
    children === undefined ? undefined : copied ? 'LOC Copied' : children;

  return (
    <Button
      className={cn(className)}
      onClick={e => {
        doCopy();
        onClick?.(e);
      }}
      leadingIcon={currentLeadingIcon}
      {...props}
    >
      {currentChildren} / {copied ? 'COPIED' : 'NOT COPIED'}
    </Button>
  );
};

interface Props {
  /** This text will be copied on click. */
  text: string;
}
