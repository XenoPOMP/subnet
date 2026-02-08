'use client';

import { useTimeoutCallback } from '@react-hook/timeout';
import cn from 'classnames';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  resetAfterMs: ms = 5_000,
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const [start, reset] = useTimeoutCallback(() => setCopied(false), ms);
  const { copy, isSupported } = useCopyToClipboard();

  // Reset timeout each time text changed
  useEffect(() => reset, [text, reset]);

  // eslint-disable-next-line jsdoc/require-jsdoc
  const doCopy = () => {
    // Do not proceed any unsupported actions
    if (!isSupported()) return;
    // Otherwise, do copy
    copy(text);
    setCopied(true);
    start();
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

  /** Define time amount to reset copied state. */
  resetAfterMs: number;
}
