import { DashboardLayout } from '@/components/layout/pages';

import { NetForm } from './components';

// eslint-disable-next-line jsdoc/require-jsdoc
export default function HomePage() {
  return (
    <DashboardLayout>
      <NetForm />
    </DashboardLayout>
  );
}
