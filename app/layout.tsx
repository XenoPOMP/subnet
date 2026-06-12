import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import 'react-tooltip/dist/react-tooltip.css';

import { Providers } from '@/components/layout';
import { env } from '@/utils/env';
import { createCanonical, generateOpenGraph } from '@/utils/seo';

import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE,
  NO_INDEX_PAGE,
} from '@app/constants';

import './globals.scss';

const mainFont = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
});

/**
 * Generic application`s metadata generation.
 */
export async function generateMetadata(): Promise<Metadata> {
  const CANONICAL_URL = env.CANONICAL_URL;

  return {
    applicationName: APP_NAME,
    metadataBase: new URL(CANONICAL_URL),
    title: {
      default: APP_NAME,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
      capable: false,
      statusBarStyle: 'default',
      title: APP_DEFAULT_TITLE,
      // startupImage: []
    },
    alternates: {
      canonical: CANONICAL_URL,
      languages: {
        ru: createCanonical(new URL(CANONICAL_URL), 'ru-RU'),
        en: createCanonical(new URL(CANONICAL_URL), 'en-US'),
        'x-default': createCanonical(new URL(CANONICAL_URL), 'en-US'),
      },
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: generateOpenGraph(),
    twitter: {
      card: 'summary',
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
    // TODO Maybe, remove this later, if SEO will be needed.
    ...NO_INDEX_PAGE,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#202020' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

/**
 * Top-level app layout. Contains providers, core layout.
 *
 * @constructor
 * @todo Update next-themes and remove suppressHydrationWarning
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='ru'
      dir='ltr'
      suppressHydrationWarning
    >
      <body className={mainFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
