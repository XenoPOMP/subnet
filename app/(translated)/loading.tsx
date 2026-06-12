import cn from 'classnames';

import { Loading } from '@/components/ui/kit';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function TranslatedLoadingPage() {
  return (
    <main className={cn('flex items-center justify-center')}>
      <Loading />
    </main>
  );
}
