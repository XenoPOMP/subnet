import type { Metadata } from 'next';
import type { Optional } from 'xenopomp-essentials';

import type { Locales } from '~/middleware.ts';

import { DashboardLayout } from '@/components/layout/pages';
import { appLocales } from '@/i18n/locales';
import { generateOpenGraph } from '@/utils/seo';

import { NetForm, NetMapContainer } from './components';

interface MetadataProps {
  searchParams: Promise<Partial<Record<'locale', Locales | undefined>>>;
}

// eslint-disable-next-line jsdoc/require-jsdoc
export async function generateMetadata({
  searchParams,
}: MetadataProps): Promise<Metadata> {
  const params = await searchParams;
  const locale: Optional<Locales> = params.locale;
  const t = appLocales[(locale ?? 'en-US') as Locales];
  const { title, desc: description } = t.seo.root;

  return {
    title,
    description,
    appleWebApp: {
      title,
    },
    openGraph: generateOpenGraph({
      title,
      description,
    }),
    twitter: {
      title,
      description,
    },
  };
}

// TODO Add adaptive layout later (maybe). 870x650 is minimal sizes for now.
// TODO Make MediaRendered component.
// eslint-disable-next-line jsdoc/require-jsdoc
export default function HomePage() {
  return (
    <DashboardLayout>
      <NetForm />
      <NetMapContainer />
    </DashboardLayout>
  );
}
