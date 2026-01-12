import type { PropsWithChildren } from 'react';

import { locales } from '~/middleware.ts';

// eslint-disable-next-line jsdoc/require-jsdoc
export function generateStaticParams(): Array<{ lang: string }> {
  return locales.map(l => ({ lang: l }));
}

// eslint-disable-next-line jsdoc/require-jsdoc
export default function DashboardCoreLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
