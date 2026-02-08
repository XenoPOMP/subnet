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
  textOnCopy,
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

  // eslint-disable-next-line jsdoc/require-jsdoc
  const getCurrentChildren = () => {
    // Show textOnCopy only if it is defined
    if (children === undefined && textOnCopy !== undefined) {
      return textOnCopy;
    }

    if (children === undefined && textOnCopy === undefined) {
      return undefined;
    }

    if (children !== undefined) {
      // TODO Replace default text on copy to translated one.
      return copied ? (textOnCopy ?? 'DEFAULT COPY MESSAGE') : children;
    }

    return undefined;
  };

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
      {getCurrentChildren()}
    </Button>
  );
};

interface Props {
  /** This text will be copied on click. */
  text: string;

  /** If defined, will show text on copy anyway. */
  textOnCopy?: string;

  /** Define time amount to reset copied state. */
  resetAfterMs: number;
}
