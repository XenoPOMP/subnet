'use client';

import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Loading } from '@/components/ui/kit';
import { useStaticLocale } from '@/hooks';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function SlugPage() {
  const { locale, isLoading } = useStaticLocale();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    router.replace(`/${locale}`);
  }, [isLoading, locale, router]);

  return (
    <div className={cn('flex-center h-dvh w-dvw')}>
      {isLoading && <Loading variant='circle' />}
    </div>
  );
}
