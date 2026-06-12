import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function TranslatedPagesLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
